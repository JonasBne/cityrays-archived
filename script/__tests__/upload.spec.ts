/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { type Prisma } from "@prisma/client";
import path from "path";
import {
  createOutletAddressInformationInput,
  createOutletOpeningHoursInput,
  createOutletSunlightHoursInput,
  outletAddressProperties,
  outletOpeningHoursProperties,
} from "script/utils";
import * as xlsx from "xlsx";

// keep track of the final input payload so we are sure at the end if we have created the correct final
// object payload because all the util functions are chained

let createOutletPayload: Prisma.OutletCreateInput;

// restore the object after the entire test suite
afterAll(() => {
  createOutletPayload = {} as Prisma.OutletCreateInput;
});

// setup a mock file
const workbook = xlsx.readFile(
  path.join(process.cwd(), "script/__tests__/mock-outlet-1.xlsx")
);
const sheetName = workbook.SheetNames[0] as string;
const mockSheet = workbook.Sheets[sheetName] as xlsx.WorkSheet;

describe("upload script", () => {
  it("step 1: returns an object with address information", () => {
    createOutletPayload = createOutletAddressInformationInput(
      mockSheet,
      outletAddressProperties
    );

    // no strict equal because createdAt and updatedAt always change
    expect(createOutletPayload).toBeDefined();
    expect(createOutletPayload).toMatchObject({
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
    createOutletPayload = createOutletOpeningHoursInput(
      mockSheet,
      createOutletPayload,
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
    expect(createOutletPayload.openingHours).toBeDefined();
    expect(createOutletPayload.openingHours).toMatchObject(openingHoursPayload);
  });

  it("step 3: returns an object with sunlight hours", () => {
    const finalCreateOutletPayload = createOutletSunlightHoursInput(
      mockSheet,
      createOutletPayload
    );

    // 52 objects, each representing one week of the year
    expect(finalCreateOutletPayload.sunlightHours).toBeDefined();
    expect(finalCreateOutletPayload.sunlightHours.length).toBe(52);
    expect(
      finalCreateOutletPayload.sunlightHours[0].outletSunlightHours.length
    ).toBe(61);
    expect(finalCreateOutletPayload.sunlightHours[0]).toMatchObject({
      startDate: "01/01/2022",
      endDate: "07/01/2022",
    });
    expect(
      finalCreateOutletPayload.sunlightHours[0].outletSunlightHours[0]
    ).toMatchObject({
      startTime: "7:00",
      endTime: "7:15",
      sunshine: 0,
    });
    expect(
      finalCreateOutletPayload.sunlightHours[0].outletSunlightHours[11]
    ).toMatchObject({
      startTime: "9:45",
      endTime: "10:00",
      sunshine: 1,
    });
  });
});
