# Email Template System with React Email, Nodemailer, and Gmail

This project demonstrates how to build an email system using React Email for templates, Nodemailer for sending, and Gmail SMTP for delivery.

## Features

- React Email templates with Tailwind CSS styling
- Nodemailer integration with Gmail SMTP
- Type-safe email templates with TypeScript
- Error handling and loading states
- Responsive email design
- Next.js 13+ App Router compatible
- 100% Free solution with Gmail
- ICS calendar file generation and attachment
- Proper calendar event ownership and attendee management

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
# Gmail credentials
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
```

**Important:** For Gmail, you need to use an App Password, not your regular password:

1. Enable 2-Step Verification in your Google Account
2. Visit https://myaccount.google.com/apppasswords
3. Select "Mail" as the app and your device
4. Click "Generate" and use the 16-character password provided

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Template Development

You can preview your email templates during development:

```bash
npm run email:dev
# or
yarn email:dev
```

This will start a local server at http://localhost:3000/email-preview where you can view and test your email templates.

## Calendar Integration

This project includes ICS calendar file generation for event invitations:

- Automatically generates ICS files for calendar events
- Attaches ICS files to event confirmation emails
- Properly sets event organizer and attendee information
- Works with most calendar applications (Google Calendar, Apple Calendar, Outlook, etc.)

To test the ICS file generation:

```bash
npm run test:ics
```

This will generate a sample ICS file in the project root directory.

## Learn More

- [React Email Documentation](https://react.email/docs/introduction)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Next.js Documentation](https://nextjs.org/docs)
- [ICS File Format Specification](https://icalendar.org/iCalendar-RFC-5545/3-6-1-event-component.html)
