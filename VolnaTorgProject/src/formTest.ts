import { chromium } from "playwright";
import { logToFile } from "./logger";

const submitForms = async (submissionCount: number, interval: number) => {
  const browser = await chromium.launch({
    headless: false, // Make the browser visible
    args: ["--start-fullscreen"], // Launch in fullscreen mode
  });

  const context = await browser.newContext({
    viewport: null, // Set viewport to null for fullscreen
  });

  const page = await context.newPage();

  // Navigate to the website
  await page.goto("https://www.volnatorg.ru/");
  console.log("Navigated to the website");

  try {
    for (let i = 0; i < submissionCount; i++) {
      try {
        // Click the "Вопрос менеджеру" link
        await page.click('a:has-text("Вопрос менеджеру")');
        console.log('Clicked the "Вопрос менеджеру" link');

        // Ensure the checkbox is checked
        if (!(await page.isChecked('input[id="8"]'))) {
          await page.check('input[id="8"]');
          console.log("The checkbox was not checked. It has been checked now.");
        } else {
          console.log("The checkbox was already checked.");
        }

        // Fill out the "Ваше имя" field
        await page.fill('input[name="form_text_5"]', `Тестовое имя ${i + 1}`);
        console.log('Filled out the "Ваше имя" field');

        // Fill out the "Контактный телефон" field
        await page.fill('input[name="form_text_6"]', `${i + 1}`);
        console.log('Filled out the "Контактный телефон" field');

        // Fill out the "Текст вопроса" field
        await page.fill(
          'textarea[name="form_textarea_9"]',
          `Тестовое сообщение: Как получить консультацию? ${i + 1}`
        );
        console.log('Filled out the "Текст вопроса" field');

        // Submit the form
        await page.click(
          'div.form_input.text-center input[type="submit"][value="Отправить заявку"]'
        );
        console.log("Submitted the form");
        // Log success
        const successMessage = page.locator(
          'div.h2.mt-3:has-text("Ваша заявка отправлена.")'
        );
        await successMessage.waitFor({ state: "visible" });
        if (await successMessage.isVisible()) {
          console.log(`Form ${i + 1} submitted successfully.`);
          logToFile("form_log.txt", `Form ${i + 1} submitted successfully.`);
        } else {
          console.log(
            `Form ${i + 1} submission failed: Success message not displayed.`
          );
          logToFile(
            "form_log.txt",
            `Form ${i + 1} submission failed: Success message not displayed.`
          );
        }
      } catch (error: unknown) {
        // Type guard to check if the error is an instance of Error
        if (error instanceof Error) {
          console.log(`Failed to submit form ${i + 1}: ${error.message}`);
          // Log failure for the current form
          logToFile(
            "form_log.txt",
            `Failed to submit form ${i + 1}: ${error.message}`
          );
        } else {
          console.log(
            `Failed to submit form ${i + 1}: Unknown error occurred.`
          );
          // In case the error is not an instance of Error
          logToFile(
            "form_log.txt",
            `Failed to submit form ${i + 1}: Unknown error occurred.`
          );
        }
      }

      await page.click('button.modal-close[data-dismiss="modal"]');
      console.log("Closed the modal");

      // Wait before the next submission
      await new Promise((resolve) => setTimeout(resolve, interval));
      console.log(
        `Waiting for ${interval} milliseconds before the next submission`
      );
    }
  } catch (error) {
    console.error("Error during form submissions:", error);
  } finally {
    await browser.close();
    console.log("Browser closed");
  }
};

// Call the function with the desired submission count and interval (in milliseconds)
submitForms(500, 2500); // Adjust count and interval as needed
