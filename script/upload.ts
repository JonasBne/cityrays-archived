/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from "node:path";
import { parseFile } from "./utils";

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
