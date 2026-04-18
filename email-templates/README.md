
# Email Templates - Gold X Usdt

This directory contains professional, production-ready HTML email templates for the Gold X Usdt platform.

## Templates Included

### 1. Email Verification Template (`email-verification.html`)
- **Purpose:** Sent when a user signs up to verify their email address
- **Design:** Green-themed with checkmark icon
- **CTA:** "Verify Email Address" button
- **Variables:**
  - `{{USER_NAME}}` - User's full name
  - `{{VERIFICATION_LINK}}` - Unique verification URL
  - `{{YEAR}}` - Current year for copyright

### 2. Password Reset Template (`password-reset.html`)
- **Purpose:** Sent when a user requests a password reset
- **Design:** Blue-themed with key icon
- **CTA:** "Reset Password" button
- **Variables:**
  - `{{USER_NAME}}` - User's full name
  - `{{RESET_LINK}}` - Unique password reset URL
  - `{{YEAR}}` - Current year for copyright

## Features

 **Mobile Responsive:** Works perfectly on all devices and screen sizes
 **Email Client Compatible:** Tested for Gmail, Outlook, Apple Mail, Yahoo Mail
 **Inline CSS:** All styles are inline for maximum compatibility
 **Security Focused:** Clear warnings about link expiration and security
 **Professional Design:** Modern, clean UI matching the Gold X Usdt brand
 **Accessible:** Proper semantic HTML and ARIA roles

## Usage in Edge Functions

To use these templates in your Supabase Edge Functions:

```typescript
// Read the template file
const templatePath = './email-templates/email-verification.html';
const template = await Deno.readTextFile(templatePath);

// Replace variables
const html = template
  .replace(/{{USER_NAME}}/g, userName)
  .replace(/{{VERIFICATION_LINK}}/g, verificationLink)
  .replace(/{{YEAR}}/g, new Date().getFullYear().toString());

// Send via your email service
await sendEmail({
  to: userEmail,
  subject: 'Verify Your Email - Gold X Usdt',
  html: html
});
```

## Customization

### Colors
- **Primary Gold:** `#FFD700`
- **Verification Green:** `#22c55e` to `#4ade80`
- **Reset Blue:** `#2563eb` to `#3b82f6`
- **Background:** `#f4f4f7`
- **Card Background:** `#ffffff`

### Expiration Time
Both templates mention **60 minutes** expiration. Update this in the template if your token expiry differs.

### Support Email
Default: `support@goldxusdt.com` - Update this in both templates if needed.

## Testing

Before deploying, test your emails using:
- [Litmus](https://litmus.com/)
- [Email on Acid](https://www.emailonacid.com/)
- [Mailtrap](https://mailtrap.io/)

## Security Notes

 **Never include sensitive data** in email templates
 **Always use HTTPS** for all links
 **Implement rate limiting** on email sending endpoints
 **Log all email sends** for audit purposes
