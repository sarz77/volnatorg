import fs from "fs";

export const logToFile = (filename: string, message: string): void => {
  fs.appendFileSync(filename, `${new Date().toISOString()} - ${message}\n`);
};
