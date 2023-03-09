/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as xlsx from "xlsx";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { filesDirectoryPath } from "@/config/paths";
import { type Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

enum EAddress {
  name = "B56",
  city = "B57",
  street = "B58",
  houseNumber = "B59",
  zipCode = "B60",
  category = "B61",
  latitude = "B62",
  longitude = "B63",
}

enum EWeekdays {
  MONDAY = "B70",
  TUESDAY = "B71",
  WEDNESDAY = "B72",
  THURSDAY = "B73",
  FRIDAY = "B74",
  SATURDAY = "B75",
  SUNDAY = "B76",
}

const prisma = new PrismaClient();

function parseFile(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const createOutletPayload = {} as Prisma.OutletCreateInput;

  // general information
  Object.entries(EAddress).forEach((keyPair) => {
    const label = keyPair[0] as EAddress;
    const cell: string = keyPair[1];
    const value: string | number = sheet[cell].v;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createOutletPayload[label] = value;
  });

  // opening hours
  const openingHours = [] as Prisma.OpeningHourCreateInput[];

  Object.entries(EWeekdays).forEach((keyPair) => {
    const weekday = keyPair[0] as EWeekdays;
    const cell: string = keyPair[1];
    const value: string | null = sheet[cell]?.v || null;

    // split on the '-' character to separate open and closing time if available
    const values = value ? value.split("-") : null;

    const openAt = values && values.length > 0 ? values[0] : null;
    const closesAt = values && values.length > 0 ? values[1] : null;

    const openingHour = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: uuidv4(),
      weekday,
      openAt,
      closesAt,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    openingHours.push(openingHour);
  });

  createOutletPayload["openingHours"] = openingHours;
}

void (async () => {
  try {
    const files = await readdir(path.join(process.cwd(), filesDirectoryPath));

    for (const file of files) {
      const filePath = path.join(filesDirectoryPath, file);
      parseFile(filePath);
    }
  } catch (err) {
    console.error("error during parsing", err);
  }
})();
