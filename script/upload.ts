import * as xlsx from "xlsx";
import path from "node:path";
import { type Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

/**
 * types
 */

const outletAddressProperties = {
  name: "B56",
  city: "B57",
  street: "B58",
  houseNumber: "B59",
  zipCode: "B60",
  category: "B61",
  latitude: "B62",
  longitude: "B63",
} as const;

type TAddressLabel = keyof typeof outletAddressProperties;

const outletOpeningHoursProperties = {
  monday: "B70",
  tuesday: "B71",
  wednesday: "B72",
  thursday: "B73",
  friday: "B74",
  saturday: "B75",
  sunday: "B76",
} as const;

type TWeekdaysLabel = keyof typeof outletOpeningHoursProperties;

const startRow = 2;
const endRow = 54;
// TODO: define and and end, not the all columns
const sunlightHoursDataColumns = [
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

const yearPeriodStartCol = "A";
const yearPeriodEndCol = "B";

const prisma = new PrismaClient();

// final payloads
// TODO: don't work with global variables
const createOutletInput = {} as Prisma.OutletCreateInput;
// const createOpeningHoursInput = [] as Prisma.OpeningHourCreateInput[];
const createSunlightHoursInput = [] as Prisma.SunlightHourCreateInput[];

// temporary payloads
const outletSunlightHours: Array<any> = [];

// TODO: make pure function
// I did the refactor already :)
function createOutletAddressInformationInput(sheet: xlsx.WorkSheet) {
  const entries = Object.entries(outletAddressProperties);
  const info = entries.reduce((acc, [key, value]) => {
    const cell = value;
    const label = key as TAddressLabel;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const cellValue = sheet[cell]?.v as string | number | undefined;

    if (cellValue) {
      acc[label] = cellValue;
    }
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<TAddressLabel, string | number | undefined>);
  return info as Prisma.OutletCreateInput;
}

// TODO: make pure function
// I did the refactor already :)
function createOutletOpeningHoursInput(
  sheet: xlsx.WorkSheet,
  outlet: Prisma.OutletCreateInput
): Prisma.OutletCreateInput {
  const entries = Object.entries(outletOpeningHoursProperties);
  const openingHours = entries.reduce((acc, [key, value]) => {
    const weekday = key as TWeekdaysLabel;
    const cell = value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const cellValue = (sheet[cell]?.v || null) as string | null;

    // split on the '-' character to separate open and closing time if available
    // so 10:00-12:00 becomes ['10:00', '12:00'] or ['10:00', null]
    const openingHours = cellValue ? cellValue.split("-") : null;

    const openAt =
      openingHours && openingHours.length > 0 && openingHours[0]
        ? openingHours[0]
        : null;
    const closesAt =
      openingHours && openingHours.length > 0 && openingHours[1]
        ? openingHours[1]
        : null;

    const openingHour = {
      id: uuidv4(),
      weekday,
      openAt,
      closesAt,
    };

    // @Peter: if you remove this ts-ignore then ts will warn that type openAt of string | null
    // is not assignable to type string, but my schema says that openAt and closesAt are optional
    // so I'm not sure why this does not work
    // TODO: can we remove this? no longer needed I think
    // acc.push(openingHour);
    return acc;
  }, [] as Prisma.OpeningHourCreateInput[]);

  // create new object, don't modify the original
  return {
    ...outlet,
    openingHours,
  };
}

// TODO: make pure function
function createOutletSunlightHoursInput(sheet: xlsx.WorkSheet) {
  const timestamps = sunlightHoursDataColumns
    .map((column) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const timestamp = sheet[`${column}1`]?.w as string | undefined;

      if (timestamp) {
        return timestamp;
      }
    })
    .filter(
      (timestamp): timestamp is Required<string> =>
        typeof timestamp !== undefined
    );

  const timestampPairs = timestamps
    .map((timestamp, index) => {
      return {
        startTime: timestamp,
        endTime: timestamps[index + 1] ?? null,
      };
    })
    .filter((timestamp) => timestamp.endTime);

  for (let i = startRow; i < endRow; i++) {
    // add all the year periods
    const startDateRowCol = `${yearPeriodStartCol}${i.toString()}`;
    const endDateRowCol = `${yearPeriodEndCol}${i.toString()}`;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const startDate = sheet[startDateRowCol]?.w as string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const endDate = sheet[endDateRowCol]?.w as string | undefined;

    if (!startDate || !endDate) {
      throw new Error("startDate and/or endDate missing");
    }

    sunlightHoursDataColumns.forEach((column, index) => {
      const timestampPair = timestampPairs[index];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const sunShine = sheet[`${column}${i.toString()}`]?.v as number;

      if (timestampPair && timestampPair.startTime && timestampPair.endTime) {
        outletSunlightHours.push({
          id: uuidv4(),
          startTime: timestampPair.startTime,
          endTime: timestampPair.endTime,
          sunShine,
        });
      }
    });

    const sunlightHourPayload: Prisma.SunlightHourCreateInput = {
      id: uuidv4(), // TODO: better to use ObjectID or sequential ID
      startDate,
      endDate,
      outletSunlightHours,
    };

    createSunlightHoursInput.push(sunlightHourPayload);
  }
  Object.assign(createOutletInput, { sunlightHours: createSunlightHoursInput });
}

function parseFile(filePath: string) {
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
  if (sheet) {
    try {
      let outletInput = createOutletAddressInformationInput(sheet);
      outletInput = createOutletOpeningHoursInput(sheet, outletInput);
      // TODO: refactor as pure function
      // outletInput = createOutletSunlightHoursInput(sheet);
      console.log("outletInput: ", outletInput);
      // TODO: don't catch and rethrow, just let the error bubble up
    } catch (err) {
      throw new Error(err as string);
    }
  } else {
    console.error("x: No valid sheet found");
  }
}

(() => {
  try {
    const firstFile = process.argv[2];
    if (!firstFile) {
      console.log("Usage: tsx ./script/upload.ts <file glob>");
      process.exit(1);
      return;
    }

    // TODO: get wildcard from command line arg
    // I did the refactor already :)
    const fileNames = process.argv
      .slice(2)
      .filter((arg: string) => !arg.startsWith("~$")); // remove temp excel files

    // Loop over files
    for (const fileName of fileNames) {
      const filePath = path.join(process.cwd(), fileName);
      console.log("processing: ", fileName);
      parseFile(filePath);
    }
    console.log("√: Upload successful");
  } catch (err) {
    console.error("x: Upload failed. Error:", err);
  }
})();
