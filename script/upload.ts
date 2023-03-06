import * as xlsx from "xlsx";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { filesDirectoryPath } from "@/config/paths";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function parseFile(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sheet = workbook.Sheets[workbook.SheetNames[0]] as unknown;
  console.log("sheet", sheet);
}

void (async () => {
  try {
    const files = await readdir(path.join(process.cwd(), filesDirectoryPath));
    console.log("files", files);

    for (const file of files) {
      const filePath = path.join(filesDirectoryPath, file);
      parseFile(filePath);
    }
  } catch (err) {
    console.error(err);
  }
})();
