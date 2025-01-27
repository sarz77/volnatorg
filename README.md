<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Volnatorg Form Submission & Email Sending Automation</h1>

  <h2>Description</h2>
  <p>
    This project automates: 
    <ul>
      <li>The "Question to Manager" form submission of the website.</li>
      <li>Email Sending Automation for Load Testing.</li>
    </ul> 
  </p>

  <h2>Form Submission Automation</h2>
  <p>
    Using Playwright, the script simulates user behavior to send multiple form submissions while ensuring compliance with timing and input requirements.
  </p>
  <p>
    The configuration allows setting up the form sending count.
  </p>
  <h4>Form from the website</h4>
  <a href="https://raw.githubusercontent.com/sarz77/volnatorg/main/Attachments/FormFill.jpg">
    <img src="https://raw.githubusercontent.com/sarz77/volnatorg/main/Attachments/FormFill.jpg" alt="Description of image" width="927" height="513">
  </a>
  <h4>The logged reporting file will look like this</h4>
  <a href="https://raw.githubusercontent.com/sarz77/volnatorg/main/Attachments/Frms.jpg">
    <img src="https://raw.githubusercontent.com/sarz77/volnatorg/main/Attachments/Frms.jpg" alt="Description of image" width="927" height="513">
  </a>

  <h2>Email Sending Automation</h2>
  <p>
    This part of the project automates sending test emails from multiple Google accounts to a specified recipient. Each email is sent with a different theme at regular intervals, and the sending process is logged for tracking purposes.
  </p>
  <p>
    Please note that Google allows sending only up to 500 emails per day from a single account. To use this feature, you must create an <i>App Password</i> from the Google account settings, as the actual account password cannot be used for authentication.
  </p>
  <h4>The sent emails log file will look like this</h4>
  <a href="https://raw.githubusercontent.com/sarz77/volnatorg/main/Attachments/Emls.jpg">
    <img src="https://raw.githubusercontent.com/sarz77/volnatorg/main/Attachments/Emls.jpg" alt="Description of image" width="927" height="513">
  </a>

  <h3>Languages and Tools Used</h3>
  <ul>
    <li><b>TypeScript</b> (Node.js)</li>
    <li><b>Playwright</b> for form submission automation</li>
    <li><b>Nodemailer</b> for email sending</li>
    <li><b>File System (fs)</b> for logging</li>
  </ul>

  <h3>How to Run the Form Submission Script</h3>
  <ol>
    <li><b>Clone the Repository:</b></li>
    <pre><code>git clone https://github.com/sarz77/volnatorg.git
cd volnatorg
    </code></pre>
    <li><b>Install Dependencies:</b></li>
    <pre><code>npm install</code></pre>
    <li><b>Run the Script:</b></li>
    <pre><code>npx playwright test</code></pre>
  </ol>

  <h3>How to Run the Email Sending Script</h3>
  <ol>
    <li><b>Clone the Repository:</b></li>
    <pre><code>git clone https://github.com/sarz77/volnatorg.git
cd volnatorg
    </code></pre>
    <li><b>Install Dependencies:</b></li>
    <pre><code>npm install nodemailer</code></pre>
    <li><b>Run the Script:</b></li>
    <pre><code>node sendEmails.js</code></pre>
  </ol>

  <h2>Program Output</h2>
  <ul>
    <li><b>Log File:</b> <code>email_send_log.txt</code> captures all successes and errors for review.</li>
    <li><b>Console Output:</b> Real-time updates of the email sending process.</li>
  </ul>

  <h2>Example Log Output</h2>
  <pre><code>
[2025-01-24T10:15:00.000Z] Email #1 sent from uchihagost23@gmail.com: <messageId>
[2025-01-24T10:15:20.000Z] Email #2 sent from thomasanderson077077@gmail.com: <messageId>
[2025-01-24T10:15:40.000Z] Error sending email #3 from arzanyan1996@gmail.com: Network error.
  </code></pre>

  <h2>Results</h2>
  <p>
    This email sending automation ensures a large number of emails are sent at controlled intervals, with detailed logging for monitoring and troubleshooting. It allows for high-volume email testing using multiple Google accounts and themes.
  </p>

  <h2>Contact</h2>
  <p>
    For any inquiries, feel free to reach out via GitHub or email.
  </p>
</body>
</html>
