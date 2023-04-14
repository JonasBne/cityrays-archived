import { type OpeningHour, type Prisma } from "@prisma/client";
import path from "path";
import {
  createOutletAddressInformationInput,
  createOutletOpeningHoursInput,
  outletAddressProperties,
  outletOpeningHoursProperties,
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
  it("step 1: returns an object with address information", () => {
    finalCreateOutletPayload = createOutletAddressInformationInput(
      mockSheet,
      outletAddressProperties
    );

    // no strict equal because createdAt and updatedAt always change
    expect(finalCreateOutletPayload).toMatchObject({
      name: "Test bar 1",
      city: "Antwerpen",
      street: "Test straat",
      houseNumber: 43,
      zipCode: 2000,
      category: "cafe",
      location: { type: "MultiPoint", coordinates: [4.40443, 51.22143] },
    });
  });

  it("step 2: returns an object with opening hours information", () => {
    finalCreateOutletPayload = createOutletOpeningHoursInput(
      mockSheet,
      finalCreateOutletPayload,
      outletOpeningHoursProperties
    );

    const openingHoursPayload = [
      {
        weekday: "monday",
        openAt: null,
        closesAt: null,
        closesAtNextDay: false,
      },
      {
        weekday: "tuesday",
        openAt: "09:00 ",
        closesAt: " 00:00",
        closesAtNextDay: true,
      },
      {
        weekday: "wednesday",
        openAt: "09:00 ",
        closesAt: " 00:00",
        closesAtNextDay: true,
      },
      {
        weekday: "thursday",
        openAt: "09:00 ",
        closesAt: " 00:00",
        closesAtNextDay: true,
      },
      {
        weekday: "friday",
        openAt: "09:00 ",
        closesAt: " 00:00",
        closesAtNextDay: true,
      },
      {
        weekday: "saturday",
        openAt: "09:00 ",
        closesAt: " 00:00",
        closesAtNextDay: true,
      },
      {
        weekday: "sunday",
        openAt: "09:00 ",
        closesAt: " 00:00",
        closesAtNextDay: true,
      },
    ];

    // no strict equal because IDs always change
    expect(finalCreateOutletPayload.openingHours).toMatchObject(
      openingHoursPayload
    );
  });
});
