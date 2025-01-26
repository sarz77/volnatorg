import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport"; // For type casting
import fs from "fs";
import path from "path";

// Logger setup
const logFilePath = path.join(__dirname, "email_send_log.txt");
const log = (message: string): void => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage); // Output to console
  fs.appendFileSync(logFilePath, logMessage); // Save to log file
};

// Configuration
const accounts = [
  { email: "test@gmail.com", password: "gtmn laaa nlad hjut" },
  { email: "test@gmail.com", password: "gbun sasr maai mpcl" },
];
const emailReceiver = "Info@volnatorg.ru"; // Recipient's email
const maxEmailsPerAccount = 470;
const totalEmailsToSend = accounts.length * maxEmailsPerAccount;
const durationInMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const interval = durationInMs / totalEmailsToSend; // Time interval between emails
const themes = [
  "Test - Доставка",
  "Test - Обратный звонок",
  "Test - Вопрос по ценам для оптовых закупок",
  "Test - Запрос коммерческого предложения",
];

// Create transporter for each account
const createTransporter = (email: string, password: string) => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465
    auth: {
      user: email,
      pass: password,
    },
  } as SMTPTransport.Options);
};

// Email sending function
const sendEmail = async (
  transporter: nodemailer.Transporter,
  emailNumber: number,
  senderEmail: string
): Promise<void> => {
  const theme = themes[emailNumber % themes.length];
  const mailOptions = {
    from: senderEmail,
    to: emailReceiver,
    subject: theme,
    text: `Это тестовое письмо #${emailNumber}. Мы проводим серию тестов для проверки работы почтового сервиса, и это письмо является частью тестового процесса.

Пожалуйста, не отвечайте на это письмо, так как оно отправлено автоматически. Мы проводим тестирование различных параметров, таких как скорость отправки, обработка различных форматов сообщений и частота доставки.

Ваше участие не требуется, и письмо предназначено исключительно для тестирования.

Спасибо за понимание.

С уважением,
Команда тестирования.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    log(`Email #${emailNumber} sent from ${senderEmail}: ${info.messageId}`);
    log(`Response: ${JSON.stringify(info)}`);
  } catch (error: unknown) {
    const e = error as Error;
    log(
      `Error sending email #${emailNumber} from ${senderEmail}: ${e.message}`
    );
  }
};

// Main function to send emails
const sendEmails = async (): Promise<void> => {
  log("Starting email sending process...");

  for (let i = 0; i < maxEmailsPerAccount; i++) {
    const tasks: Promise<void>[] = [];
    for (let j = 0; j < accounts.length; j++) {
      const { email, password } = accounts[j];
      const transporter = createTransporter(email, password);
      const emailNumber = i * accounts.length + j + 1;
      tasks.push(
        (async (currentEmailNumber: number) => {
          await sendEmail(transporter, currentEmailNumber, email);
          await new Promise((resolve) => setTimeout(resolve, interval));
        })(emailNumber)
      );
    }
    await Promise.all(tasks);
    log(`Batch ${i + 1} of ${accounts.length} emails sent.`);
  }

  log("Finished sending emails.");
};

// Start the email sending process
sendEmails().catch((error) => log(`Error in sendEmails: ${error.message}`));
