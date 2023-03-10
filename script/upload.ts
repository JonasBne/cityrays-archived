/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as xlsx from "xlsx";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { filesDirectoryPath } from "@/config/paths";
import { type Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

type TAddressLabel =
  | "name"
  | "city"
  | "street"
  | "houseNumber"
  | "zipCode"
  | "category"
  | "latitude"
  | "longitude";

enum EAddressSheetCells {
  name = "B56",
  city = "B57",
  street = "B58",
  houseNumber = "B59",
  zipCode = "B60",
  category = "B61",
  latitude = "B62",
  longitude = "B63",
}

type TOutletAddressProperties = {
  [key in TAddressLabel]: EAddressSheetCells;
};

const outletAddressProperties: TOutletAddressProperties = {
  name: EAddressSheetCells.name,
  city: EAddressSheetCells.city,
  street: EAddressSheetCells.street,
  houseNumber: EAddressSheetCells.houseNumber,
  zipCode: EAddressSheetCells.zipCode,
  category: EAddressSheetCells.category,
  latitude: EAddressSheetCells.longitude,
  longitude: EAddressSheetCells.name,
};

type TWeekdaysLabel =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

enum EWeekdaysSheetCells {
  MONDAY = "B70",
  TUESDAY = "B71",
  WEDNESDAY = "B72",
  THURSDAY = "B73",
  FRIDAY = "B74",
  SATURDAY = "B75",
  SUNDAY = "B76",
}

type TOutletWeekdaysProperties = {
  [key in TWeekdaysLabel]: EWeekdaysSheetCells;
};

const outletOpeningHoursProperties: TOutletWeekdaysProperties = {
  monday: EWeekdaysSheetCells.MONDAY,
  tuesday: EWeekdaysSheetCells.TUESDAY,
  wednesday: EWeekdaysSheetCells.WEDNESDAY,
  thursday: EWeekdaysSheetCells.THURSDAY,
  friday: EWeekdaysSheetCells.FRIDAY,
  saturday: EWeekdaysSheetCells.SATURDAY,
  sunday: EWeekdaysSheetCells.SUNDAY,
};

const startRow = 2;
const endRow = 54;
const dataColumns = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "AA",
  "AB",
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AH",
  "AI",
  "AJ",
  "AK",
  "AL",
  "AM",
  "AN",
  "AO",
  "AP",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AV",
  "AW",
  "AX",
  "AY",
  "AZ",
  "BA",
  "BB",
  "BC",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BK",
  "BL",
];

const yearPeriodColumns = ["A", "B"];

const prisma = new PrismaClient();

const createOutletPayload = {} as Prisma.OutletCreateInput;

function createOutletAddressInformationPayload(sheet: any) {
  Object.entries(outletAddressProperties).forEach((keyPair) => {
    const label = keyPair[0] as TAddressLabel;
    const cell: string = keyPair[1];
    const value: string | number = sheet[cell]?.v;

    // @ts-ignore
    createOutletPayload[label] = value;
  });
}

function createOutletOpeningHoursPayload(sheet: any) {
  const openingHours = [] as Prisma.OpeningHourCreateInput[];

  Object.entries(outletOpeningHoursProperties).forEach((keyPair) => {
    const weekday = keyPair[0] as TWeekdaysLabel;
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

    // @ts-ignore
    openingHours.push(openingHour);
  });
  createOutletPayload["openingHours"] = openingHours;
}

function createOutletSunlightHoursPayload(sheet: any) {
  const sunlightHours = [] as Prisma.SunlightHourCreateInput[];

  const yearPeriodStartCol = yearPeriodColumns[0] as string;
  const yearPeriodEndCol = yearPeriodColumns[1] as string;

  for (let i = startRow; i < endRow; i++) {
    const startDateRowCol = `${yearPeriodStartCol}${i.toString()}`;
    const endDateRowCol = `${yearPeriodEndCol}${i.toString()}`;

    const startDate = sheet[startDateRowCol]?.w;
    const endDate = sheet[endDateRowCol]?.w;

    const sunlightHourPayload = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: uuidv4(),
      startDate,
      endDate,
      outletSunlightHours: [],
    };

    sunlightHours.push(sunlightHourPayload);
  }
  createOutletPayload["sunlightHours"] = sunlightHours;
}

function parseFile(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  createOutletAddressInformationPayload(sheet);
  createOutletOpeningHoursPayload(sheet);
  createOutletSunlightHoursPayload(sheet);
}

void (async () => {
  try {
    const files = await readdir(path.join(process.cwd(), filesDirectoryPath));

    for (const file of files) {
      const filePath = path.join(filesDirectoryPath, file);
      parseFile(filePath);
      console.log(createOutletPayload);
    }
  } catch (err) {
    console.error("error during parsing", err);
  }
})();
