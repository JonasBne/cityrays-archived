/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as xlsx from "xlsx";
import { type Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

/**
 * types
 */

export const outletAddressProperties = {
  name: "B56",
  city: "B57",
  street: "B58",
  houseNumber: "B59",
  zipCode: "B60",
  category: "B61",
  latitude: "B62",
  longitude: "B63",
} as const;

export type TAddressLabel = keyof typeof outletAddressProperties;

export const outletOpeningHoursProperties = {
  monday: "B70",
  tuesday: "B71",
  wednesday: "B72",
  thursday: "B73",
  friday: "B74",
  saturday: "B75",
  sunday: "B76",
} as const;

export type TWeekdaysLabel = keyof typeof outletOpeningHoursProperties;

export const outletClosesNextDayProperties = {
  monday: "B79",
  tuesday: "B80",
  wednesday: "B81",
  thursday: "B82",
  friday: "B83",
  saturday: "B84",
  sunday: "B85",
} as const;

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

export const createOutletAddressInformationInput = (
  sheet: xlsx.WorkSheet,
  excelRowsAndCols: typeof outletAddressProperties
) => {
  const entries = Object.entries(excelRowsAndCols);

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
    createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  } as Prisma.OutletCreateInput;
};

export const createOutletOpeningHoursInput = (
  sheet: xlsx.WorkSheet,
  outlet: Prisma.OutletCreateInput,
  excelRowsAndCols: typeof outletOpeningHoursProperties
): Prisma.OutletCreateInput => {
  const openingHoursEntries = Object.entries(excelRowsAndCols);

  const openingHours = openingHoursEntries.reduce((acc, [key, value]) => {
    const weekday = key as TWeekdaysLabel;
    const cell = value;
    const cellValue = (sheet[cell]?.v || null) as string | null;

    const openingHours = () => {
      if (!cellValue) {
        return null;
      }

      // if the cellValue includes a ; character it contains multiple opening and closing
      // times for a given day
      if (cellValue.includes(";")) {
        const openingHoursPair = cellValue.split(";");
        // also split again on - character to separate open and closing time
        return openingHoursPair.map((openingHoursPair) =>
          openingHoursPair.split("-")
        );
      }

      // split on the '-' character to separate open and closing time if available
      // so 10:00-12:00 becomes ['10:00', '12:00'] or ['10:00', null]
      return cellValue.split("-");
    };

    const closesAtNextDay = (sheet[outletClosesNextDayProperties[weekday]]?.v ||
      false) as boolean;

    // if the length is four then it contains multiple hours for a given day
    // and then we create two objects instead of one, but just loop over the initial array
    // which contains two elements, each representing a pair of open and closing times
    // for that day
    if (openingHours()?.flat().length === 4) {
      openingHours()?.forEach((openingHoursPair) => {
        const openingHour = {
          id: uuidv4(),
          weekday,
          openAt: openingHoursPair[0] || null,
          closesAt: openingHoursPair[1] || null,
          closesAtNextDay,
        };
        // @ts-ignore
        acc.push(openingHour);
      });
    } else {
      const openingHour = {
        id: uuidv4(),
        weekday,
        openAt: openingHours()?.[0] || null,
        closesAt: openingHours()?.[1] || null,
        closesAtNextDay,
      };
      // @ts-ignore
      acc.push(openingHour);
    }
    return acc;
  }, [] as Prisma.OpeningHourCreateInput[]);

  // create new object, don't modify the original
  return {
    ...outlet,
    openingHours,
  };
};

export const getTimestampPairs = (
  sheet: xlsx.WorkSheet
): Array<TimestampPair> => {
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
};

export const createOutletSunlightHoursInput = (
  sheet: xlsx.WorkSheet,
  outlet: Prisma.OutletCreateInput
): Prisma.OutletCreateInput => {
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
              sunshine: value,
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
};

const upsertOutlet = async (outletInput: Prisma.OutletCreateInput) => {
  const outlets = await prisma.outlet.findMany();

  const existingOutlet = outlets.find(
    (outlet) =>
      // @ts-ignore
      outlet.location.coordinates[0] === outletInput.location.coordinates[0] &&
      // @ts-ignore
      outlet.location.coordinates[1] === outletInput.location.coordinates[1]
  );

  if (existingOutlet) {
    // remove the createdAt field from the input
    // for existing outlets
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, ...input } = outletInput;

    await prisma.outlet.update({
      where: {
        id: existingOutlet.id,
      },
      data: input,
    });
    return;
  }

  await prisma.outlet.create({ data: outletInput });
};

export const parseFile = async (filePath: string) => {
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;

  if (!sheet) {
    return;
  }

  let outletInput = createOutletAddressInformationInput(
    sheet,
    outletAddressProperties
  );
  outletInput = createOutletOpeningHoursInput(
    sheet,
    outletInput,
    outletOpeningHoursProperties
  );

  outletInput = createOutletSunlightHoursInput(sheet, outletInput);

  return await upsertOutlet(outletInput);
};
