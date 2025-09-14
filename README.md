# Contact Backend for Logic Junior

Production-ready Node.js backend for Contact Us form submissions. Sends emails using Nodemailer with a professional HTML template.

## Features
- Express REST API (`/api/contact`)
- Nodemailer mail service
- HTML email template
- Input validation & security
- Rate limiting
- Environment config via `.env`

## Setup
1. Copy `.env.example` to `.env` and fill in your SMTP credentials.
2. Run `npm install` in `contact-backend`.
3. Start server: `npm start`

## API
POST `/api/contact`
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "message": "Your message here"
}
```

## Frontend Integration
Send a POST request from your contact form to `/api/contact`.

## Security
- Helmet for HTTP headers
- Rate limiting (5 requests/minute per IP)
- Input validation

## Customization
- Edit `services/mailService.js` for your own email template or logic.

---
