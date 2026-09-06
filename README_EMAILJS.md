# EmailJS Setup Guide for Contact Form

Your new premium contact section relies on **EmailJS** to send real emails directly from the browser without requiring a backend server. 

Since the `script.js` currently uses placeholder values, you need to configure your own EmailJS account and update the JavaScript file with your keys. Follow these steps exactly:

## Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and click **Sign Up Free**.
2. Create an account and log in to your dashboard.

## Step 2: Add an Email Service
1. In your EmailJS dashboard, go to the **Email Services** tab.
2. Click **Add New Service**.
3. Select your email provider (e.g., Gmail) and click **Connect Account**.
4. Follow the prompts to authorize EmailJS to send emails on your behalf.
5. Click **Create Service**.
6. **Important:** Copy the **Service ID** (it usually looks like `service_xxxxxx`).

## Step 3: Create an Email Template
1. Go to the **Email Templates** tab.
2. Click **Create New Template**.
3. You need to configure the template to accept the variables we pass from the frontend.
4. Set the **Subject** field to: `NEW PORTFOLIO CONTACT: {{subject}}`
5. In the **Content** area, format your email like this:
   ```text
   You have received a new message from your portfolio website!

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```
6. (Optional) In the **Reply-To** field on the right sidebar, put `{{from_email}}`. This ensures that when you click "Reply" in your email client, it sends a reply directly to the person who filled out the form.
7. Click **Save**.
8. **Important:** Copy the **Template ID** (it usually looks like `template_xxxxxx`).

## Step 4: Get Your Public Key
1. Go to the **Account** tab (top right corner).
2. Under the **API keys** section, locate your **Public Key**.
3. **Important:** Copy the **Public Key**.

## Step 5: Update Your `script.js`
1. Open your `script.js` file.
2. Scroll to the very bottom to find the section titled `1. EmailJS Configuration`.
3. It will look like this:
   ```javascript
   const EMAIL_CONFIG = {
       publicKey: "YOUR_PUBLIC_KEY",
       serviceId: "YOUR_SERVICE_ID",
       templateId: "YOUR_TEMPLATE_ID"
   };
   ```
4. Replace `"YOUR_PUBLIC_KEY"`, `"YOUR_SERVICE_ID"`, and `"YOUR_TEMPLATE_ID"` with the actual values you copied in the previous steps.
5. Save the file.

## Step 6: Test the Form
1. Open your portfolio in a browser.
2. Fill out the "Get In Touch" form completely.
3. Click "Send Message".
4. If everything is configured correctly, the button will change to "Message Sent ✓" and you will receive an email in your inbox!

> **Note:** Never share your EmailJS *Private* Key in your frontend JavaScript code. Only the *Public* Key should be used, which is completely safe to put in your `script.js`.
