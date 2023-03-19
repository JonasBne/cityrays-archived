/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as xlsx from "xlsx";
import path from "node:path";
import { type Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// TODO: add support for multiple openingHours on a single day

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

interface TimestampPair {
  startTime: string;
  endTime: string;
}

/**
 * consts excel file
 */

const startRow = 2;
const endRow = 54;
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

/**
 * prisma client
 */

const prisma = new PrismaClient();

/**
 * helper functions
 */

function createOutletAddressInformationInput(sheet: xlsx.WorkSheet) {
  const entries = Object.entries(outletAddressProperties);

  const { latitude, longitude, ...addressInformation } = entries.reduce(
    (acc, [key, value]) => {
      const cell = value;
      const label = key as TAddressLabel;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const cellValue = sheet[cell]?.v as string | number | undefined;

      if (cellValue) {
        acc[label] = cellValue;
      }
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    },
    {} as Record<TAddressLabel, string | number | undefined>
  );

  const location = {
    type: "MultiPoint",
    coordinates: [longitude, latitude],
  };

  return {
    ...addressInformation,
    location,
  } as Prisma.OutletCreateInput;
}

function createOutletOpeningHoursInput(
  sheet: xlsx.WorkSheet,
  outlet: Prisma.OutletCreateInput
): Prisma.OutletCreateInput {
  const entries = Object.entries(outletOpeningHoursProperties);

  const openingHours = entries.reduce((acc, [key, value]) => {
    const weekday = key as TWeekdaysLabel;
    const cell = value;
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

    // @ts-ignore
    acc.push(openingHour);
    return acc;
  }, [] as Prisma.OpeningHourCreateInput[]);

  // create new object, don't modify the original
  return {
    ...outlet,
    openingHours,
  };
}

function getTimestampPairs(sheet: xlsx.WorkSheet): Array<TimestampPair> {
  // grab all the timestamps in the file and group them in pairs with a start and end time
  // and filter out any pairs that have no end time
  const timestamps = sunlightHoursDataColumns.map(
    (column) => sheet[`${column}1`]?.w
  ) as Array<string>;

  return timestamps
    .map((timestamp, index) => {
      return {
        startTime: timestamp,
        // look for the next position in the original array
        endTime: timestamps[index + 1],
      };
    })
    .filter(
      (timestampPair) =>
        timestampPair && timestampPair.startTime && timestampPair.endTime
    ) as Array<TimestampPair>;
}

function createOutletSunlightHoursInput(
  sheet: xlsx.WorkSheet,
  outlet: Prisma.OutletCreateInput
): Prisma.OutletCreateInput {
  const outletSunlightHoursInput = [] as Array<Prisma.SunlightHourCreateInput>;

  const timestampPairs = getTimestampPairs(sheet);

  for (let i = startRow; i < endRow; i++) {
    // for each row determine the start and end period based on the year period columns

    const startDate = sheet[`A${i}`]?.w as string;
    const endDate = sheet[`B${i}`]?.w as string;

    const outletSunlightHours = sunlightHoursDataColumns
      .map(
        (column, index): Prisma.OutletSunlightHourCreateInput | undefined => {
          const value = sheet[`${column}${i}`]?.v;

          // the current timestamp pair can be derived from the current column index
          // if we are for example in the first data column that contains sunshine we are at index 0
          // and this matches to the timestamp pair at index 0, which is 07:00-07:15
          // so we can use to extract the start and end time
          const currentTimestampPair = timestampPairs[index];

          // the first column has index 0 and that corresponds to index 0 in the timestampPairs array
          if (currentTimestampPair) {
            return {
              id: uuidv4(),
              startTime: currentTimestampPair.startTime,
              endTime: currentTimestampPair.endTime,
              sunShine: value,
            };
          }
        }
      )
      .filter(
        (
          outletSunlightHourInput
        ): outletSunlightHourInput is Required<Prisma.OutletSunlightHourCreateInput> =>
          outletSunlightHourInput !== undefined
      );

    const input: Prisma.SunlightHourCreateInput = {
      id: uuidv4(),
      startDate,
      endDate,
      outletSunlightHours,
    };

    outletSunlightHoursInput.push(input);
  }

  return {
    ...outlet,
    sunlightHours: outletSunlightHoursInput,
  };
}

async function upsertOutlet(outletInput: Prisma.OutletCreateInput) {
  const outlet = await prisma.outlet.upsert({
    where: {
      location: outletInput.location,
    },
    update: outletInput,
    create: outletInput,
  });

  return outlet;
}

async function parseFile(filePath: string) {
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;

  if (!sheet) {
    return;
  }

  let outletInput = createOutletAddressInformationInput(sheet);
  outletInput = createOutletOpeningHoursInput(sheet, outletInput);
  outletInput = createOutletSunlightHoursInput(sheet, outletInput);

  return await upsertOutlet(outletInput);
}

/**
 * file upload
 */

void (async () => {
  try {
    const firstFile = process.argv[2];

    if (!firstFile) {
      console.error("x: Upload failed. No file found.");
      process.exit(1);
    }

    const fileNames = process.argv
      .slice(2)
      .filter((arg: string) => !arg.includes("~$")); // remove temp excel files

    // loop over files
    for (const fileName of fileNames) {
      const filePath = path.join(process.cwd(), fileName);
      console.log("Processing: ", fileName);

      await parseFile(filePath);
    }
    console.log("√: Upload successful");
  } catch (err) {
    console.error("x: Upload failed. Error:", err);
  }
})();
