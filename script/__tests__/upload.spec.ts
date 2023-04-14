import { type Prisma } from "@prisma/client";
import path from "path";
import {
  createOutletAddressInformationInput,
  outletAddressProperties,
} from "script/utils";
import * as xlsx from "xlsx";

// keep track of the final input payload so we are sure at the end if we have created the correct final
// object payload because all the util functions are chained

let finalCreateOutletPayload: Prisma.OutletCreateInput;

// restore the object after the entire test suite
afterAll(() => {
  finalCreateOutletPayload = {} as Prisma.OutletCreateInput;
});

// setup a mock file
const workbook = xlsx.readFile(
  path.join(process.cwd(), "script/__tests__/mock-outlet-1.xlsx")
);
const sheetName = workbook.SheetNames[0] as string;
const mockSheet = workbook.Sheets[sheetName] as xlsx.WorkSheet;

describe("upload script", () => {
  it("returns an object with address information", () => {
    finalCreateOutletPayload = createOutletAddressInformationInput(
      mockSheet,
      outletAddressProperties
    );

    // timestamp always changes for createdAt and updatedAt so we just extract this from the result
    // and use it in the assertion
    const { createdAt, updatedAt } = finalCreateOutletPayload;

    expect(finalCreateOutletPayload).toStrictEqual({
      name: "Test bar 1",
      city: "Antwerpen",
      street: "Test straat",
      houseNumber: 43,
      zipCode: 2000,
      category: "cafe",
      location: { type: "MultiPoint", coordinates: [4.40443, 51.22143] },
      createdAt,
      updatedAt,
    });
  });
});
