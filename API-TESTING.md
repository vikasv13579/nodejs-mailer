# API Testing Guide - Postman

Base URL: `http://localhost:5000`

---

## 1. Health Check

**Endpoint:** `GET /api`

**Request:**
- Method: `GET`
- URL: `http://localhost:5000/api`
- No body required

**Response:**
```json
{
  "message": "Email API Server is working!",
  "version": "1.0.0",
  "endpoints": {
    "bulkEmail": "POST /api/email/send-email",
    "singleEmail": "POST /api/email/send-single-email",
    "register": "POST /api/email/register"
  }
}
```

---

## 2. Send Single Email

**Endpoint:** `POST /api/email/send-single-email`

**Request:**
- Method: `POST`
- URL: `http://localhost:5000/api/email/send-single-email`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "to": "recipient@example.com",
  "subject": "Test Email Subject",
  "text": "This is a plain text email",
  "html": "<p>This is an <b>HTML</b> email</p>",
  "from": "optional-custom-from@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "<message-id>",
  "message": "Email sent successfully"
}
```

---

## 3. Send Bulk Emails

**Endpoint:** `POST /api/email/send-email`

**Request:**
- Method: `POST`
- URL: `http://localhost:5000/api/email/send-email`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "recipients": [
    "email1@example.com",
    "email2@example.com",
    "email3@example.com"
  ],
  "subject": "Bulk Email Subject",
  "text": "This is a bulk email in plain text",
  "html": "<p>This is a <b>bulk email</b> in HTML</p>"
}
```

**Response:**
```json
{
  "results": [
    {
      "email": "email1@example.com",
      "success": true,
      "messageId": "<message-id>"
    },
    {
      "email": "email2@example.com",
      "success": true,
      "messageId": "<message-id>"
    },
    {
      "email": "email3@example.com",
      "success": false,
      "error": "Error message here"
    }
  ]
}
```

---

## 4. User Registration

**Endpoint:** `POST /api/email/register`

**Request:**
- Method: `POST`
- URL: `http://localhost:5000/api/email/register`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "CompanyName": "ABC Corporation",
  "MobileNumber": "+1234567890",
  "Password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Registration successful! Email sent.",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "CompanyName": "ABC Corporation",
    "MobileNumber": "+1234567890"
  }
}
```

---

## Error Responses

**400 Bad Request:**
```json
{
  "error": "Recipients array is required and must not be empty"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to send email",
  "message": "Error details here"
}
```

---

## Notes:
- Make sure your server is running on `http://localhost:5000` (or update the base URL)
- Ensure `.env` file has `EMAIL_USER` and `EMAIL_PASS` configured
- For Gmail, use an App Password, not your regular password

