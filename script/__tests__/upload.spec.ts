/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { type Prisma } from "@prisma/client";
import path from "path";
import {
  createOutletAddressInformationInput,
  createOutletOpeningHoursInput,
  createOutletSunlightHoursInput,
  getSecondsSinceMidgnight,
  outletAddressProperties,
  outletOpeningHoursProperties,
} from "script/utils";
import * as xlsx from "xlsx";
import { getDayOfYear, parse } from "date-fns";

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
      latitude: 51.22143,
      longitude: 4.40443,
    });
  });

  it("step 2: returns an object with opening hours information", () => {
    createOutletPayload = createOutletOpeningHoursInput(
      mockSheet,
      createOutletPayload,
      outletOpeningHoursProperties
    );

    // TODO: add extra test cases in case of multiple openinghours per day
    const openingHoursPayload = [
      {
        weekday: "monday",
        openingHours: null,
        openAt: null,
        closesAt: null,
        closesAtNextDay: false,
      },
      {
        weekday: "tuesday",
        openingHours: "09:00 - 00:00",
        openAt: getSecondsSinceMidgnight("09:00"),
        closesAt: getSecondsSinceMidgnight("00:00"),
        closesAtNextDay: true,
      },
      {
        weekday: "wednesday",
        openingHours: "09:00 - 00:00",
        openAt: getSecondsSinceMidgnight("09:00"),
        closesAt: getSecondsSinceMidgnight("00:00"),
        closesAtNextDay: true,
      },
      {
        weekday: "thursday",
        openingHours: "09:00 - 00:00",
        openAt: getSecondsSinceMidgnight("09:00"),
        closesAt: getSecondsSinceMidgnight("00:00"),
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
        openingHours: "09:00 - 00:00",
        openAt: getSecondsSinceMidgnight("09:00"),
        closesAt: getSecondsSinceMidgnight("00:00"),
        closesAtNextDay: true,
      },
      {
        weekday: "sunday",
        openingHours: "09:00 - 00:00",
        openAt: getSecondsSinceMidgnight("09:00"),
        closesAt: getSecondsSinceMidgnight("00:00"),
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

    console.log(finalCreateOutletPayload.sunlightHours[0].outletSunlightHours);

    expect(finalCreateOutletPayload.sunlightHours).toBeDefined();
    // 52 objects, each representing one week of the year
    expect(finalCreateOutletPayload.sunlightHours.length).toBe(52);
    // 61 timestamp pairs for each week (from 07:00 to 22:15)
    expect(
      finalCreateOutletPayload.sunlightHours[0].outletSunlightHours.length
    ).toBe(61);
    expect(finalCreateOutletPayload.sunlightHours[0]).toMatchObject({
      period: "01/01/2022-07/01/2022",
      start: getDayOfYear(parse("01/01/2022", "dd/MM/yyyy", new Date())),
      end: getDayOfYear(parse("07/01/2022", "dd/MM/yyyy", new Date())),
    });
    expect(
      finalCreateOutletPayload.sunlightHours[0].outletSunlightHours[0]
    ).toMatchObject({
      hours: "7:00-7:15",
      start: getSecondsSinceMidgnight("7:00"),
      end: getSecondsSinceMidgnight("7:15"),
      sunshine: 0,
    });
    expect(
      finalCreateOutletPayload.sunlightHours[0].outletSunlightHours[11]
    ).toMatchObject({
      hours: "9:45-10:00",
      start: getSecondsSinceMidgnight("9:45"),
      end: getSecondsSinceMidgnight("10:00"),
      sunshine: 1,
    });
  });
});
