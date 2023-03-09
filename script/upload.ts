/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as xlsx from "xlsx";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { filesDirectoryPath } from "@/config/paths";
import { type Outlet, PrismaClient } from "@prisma/client";
import { create } from "node:domain";

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

const prisma = new PrismaClient();

function parseFile(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const createOutletPayload = {} as Outlet;

  // general information
  Object.entries(EAddress).forEach((keyPair) => {
    console.log(keyPair);
    // label (name, city,...)
    const key = keyPair[0] as EAddress;
    // corresponding cell
    const cell = keyPair[1];

    const value = sheet[cell].v;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createOutletPayload[key] = value;
  });

  console.log(createOutletPayload);
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
