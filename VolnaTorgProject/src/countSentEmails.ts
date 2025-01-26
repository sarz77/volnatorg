import fs from "fs";
import path from "path";

const logFilePath = path.join(__dirname, "email_send_log.txt");

const countSentEmails = () => {
  try {
    const logContent = fs.readFileSync(logFilePath, "utf-8");
    const sentEmailCount = (logContent.match(/Email #\d+ sent from/g) || [])
      .length;
    console.log(`Total sent emails: ${sentEmailCount}`);
  } catch (error) {
    console.error("Error reading the log file:", error);
  }
};

countSentEmails();
