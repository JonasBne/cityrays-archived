import path from "path";
import {
  getSecondsSinceMidgnight,
  getSunlightHourColumns,
  getTimestampPairs,
} from "..";
import * as xlsx from "xlsx";

// setup a mock file
const workbook = xlsx.readFile(
  path.join(process.cwd(), "script/__tests__/mock-outlet-1.xlsx")
);
const sheetName = workbook.SheetNames[0] as string;
const mockSheet = workbook.Sheets[sheetName] as xlsx.WorkSheet;

describe("upload utils", () => {
  describe("getSunlightHourColumns", () => {
    it("returns an array of columns with the correct lenght", () => {
      const columns = getSunlightHourColumns("C", 61);
      expect(columns).toHaveLength(61);
      expect(columns.shift()).toBe("C");
      expect(columns.pop()).toBe("BL");
    });
  });

  describe("getSecondsSinceMidgnight", () => {
    it("returns the correct number of seconds elapsed since midnight", () => {
      expect(getSecondsSinceMidgnight("01:00")).toStrictEqual(3600);
      expect(getSecondsSinceMidgnight("09:00")).toStrictEqual(32400);
      expect(getSecondsSinceMidgnight("00:00")).toStrictEqual(0);
      expect(getSecondsSinceMidgnight("09:30")).toStrictEqual(34200);
    });

    describe("getTimestampPairs", () => {
      it("returns the correct number of timestamp pairs", () => {
        const timestampPairs = getTimestampPairs(mockSheet);
        expect(timestampPairs).toHaveLength(60);
      });
    });
  });
});
