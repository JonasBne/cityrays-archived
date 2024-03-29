/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as xlsx from "xlsx";
import { type Prisma, PrismaClient } from "@prisma/client";
import { format, getDayOfYear, parse } from "date-fns";
import ObjectID from "bson-objectid";
import { getSecondsSinceMidgnight } from "@/utils/time";

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

export const getSunlightHourColumns = (
  startColumn: string,
  numberOfColumns: number
) => {
  const columns: Array<string> = [];

  for (let i = 0; i < numberOfColumns; i++) {
    const baseCharCode = startColumn.charCodeAt(0);
    const charCode = baseCharCode + i;

    // for all letters between A and Z
    if (charCode <= 90) {
      const column = String.fromCharCode(charCode);
      columns.push(column);
    }
    // now we need to start making combinations starting again from A, e.g. AA, AB, AC, etc.
    if (charCode > 90 && charCode <= 116) {
      const diff = charCode - 91;
      const column = String.fromCharCode(65) + String.fromCharCode(65 + diff);
      columns.push(column);
    }

    if (charCode >= 117 && charCode <= 142) {
      const diff = charCode - 117;
      const column = String.fromCharCode(66) + String.fromCharCode(66 + diff);
      columns.push(column);
    }
  }

  return columns;
};

const sunlightHoursDataColumns = getSunlightHourColumns("C", 62);

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

  return {
    ...addressInformation,
    latitude,
    longitude,
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
    const closesAtNextDay = (sheet[outletClosesNextDayProperties[weekday]]?.v ||
      false) as boolean;

    const getOpeningHours = () => {
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

    // returns an array of arrays, e.g. [['09:00', '12:00'], ['13:00', '18:00']] in case of multiple openingHours
    // or [['09:00', '12:00']] in case of a single openingHours
    const openingHours = getOpeningHours();

    // if the length is four then it contains multiple hours for a given day, e.g. ['09:00', '12:00', '13:00', '18:00']
    // and then we create two objects instead of one, but just loop over the initial array
    // which contains two elements, each representing a pair of open and closing times
    // for that day
    const hasMultipleOpeningHours = openingHours?.flat().length === 4;

    if (hasMultipleOpeningHours) {
      openingHours.forEach((openingHoursPair) => {
        const openingHours =
          openingHoursPair[0] && openingHoursPair[1]
            ? `${openingHoursPair[0]}-${openingHoursPair[1]}`
            : null;

        const openingHour = {
          id: ObjectID().toHexString(),
          weekday,
          openingHours,
          openAt: openingHoursPair[0]
            ? getSecondsSinceMidgnight(openingHoursPair[0])
            : null,
          closesAt: openingHoursPair[1]
            ? getSecondsSinceMidgnight(openingHoursPair[1])
            : null,
          closesAtNextDay,
        };
        // @ts-ignore
        acc.push(openingHour);
      });
    } else {
      // we now for certain that's is just a single openingHours pair
      // and hence can assert it's type
      const openingHours = getOpeningHours() as Array<string> | null;
      // remove all whitespace
      const openAt = openingHours?.[0]?.replace(/\s/g, "") || null;
      const closesAt = openingHours?.[1]?.replace(/\s/g, "") || null;

      const openingHour = {
        id: ObjectID().toHexString(),
        weekday,
        openingHours: openAt && closesAt ? `${openAt}-${closesAt}` : null,
        openAt: openAt ? getSecondsSinceMidgnight(openAt) : null,
        closesAt: closesAt ? getSecondsSinceMidgnight(closesAt) : null,
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
    const period = `${startDate} - ${endDate}`;

    // get number of day in the year (1-365)
    const startDateWeekdayNumber = getDayOfYear(
      parse(startDate, "dd/MM/yyyy", new Date())
    );
    const endDateWeekdayNumber = getDayOfYear(
      parse(endDate, "dd/MM/yyyy", new Date())
    );

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
              id: ObjectID().toHexString(),
              hours: `${currentTimestampPair.startTime}-${currentTimestampPair.endTime}`,
              start: getSecondsSinceMidgnight(currentTimestampPair.startTime),
              end: getSecondsSinceMidgnight(currentTimestampPair.endTime),
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
      id: ObjectID().toHexString(),
      period,
      start: startDateWeekdayNumber,
      end: endDateWeekdayNumber,
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
  // when we update an existing input we do not want to pass a newly createdAt field
  // it should keep the initial value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...input } = outletInput;

  await prisma.outlet.upsert({
    where: {
      latitude_longitude: {
        latitude: outletInput.latitude,
        longitude: outletInput.longitude,
      },
    },
    create: outletInput,
    update: input,
  });
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
