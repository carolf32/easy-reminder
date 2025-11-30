# Easy Reminder 
A smart reminder application with accessibility features and emergency functionality.
## About the project 
Easy Reminder is a web application designed to help users efficiently manage their reminders, with a focus on accessibility and safety. The system includes emergency alert features and font size adjustments for better user experience.
## Features 
### Smart Reminders 
- Categorization: Organize reminders by categories (Medication, Appointments, Tasks, etc.)
- Visual notifications: Highlight for upcoming reminders (24h) and completed ones
- Responsive interface: Adaptable for desktop, tablet and mobile

### Accessibility
- Font size control: 5 zoom levels (+2, +1, normal, -1, -2)
- Inclusive design: High contrast colors and clean interface
- Intuitive navigation: Simplified flow for all users

### Emergency button
- SOS button: Quick alert in emergency situations
- Location: Automatic coordinates sending (optional)
- Emergency contact: Register contacts for notification

## Tech stack 
### Frontend
- Next.js - React framework with App Router
- Typescript - Static typing
- Tailwind CSS - Utility-first styling
- Axios - HTTP client for APIs

### Backend 
- Node.js - Runtime environment
- Express - Web framework
- Typescript - Backend type safety
- Prisma - Database ORM
- PostgreSQL - Database system
- JWT - Authentication tokens
- Zod - Schema validation

## Getting started - installation
### Clone the repository
```
git clone https://github.com/your-username/easy-reminder.git
cd easy-reminder
```
### Backend setup
```
cd backend
npm install
```
### Database setup 
```
npx prisma generate
npx prisma migrate dev
```
### Frontend setup 
```
cd frontend
npm install
```
### Configure .env 
```
DATABASE_URL="postgresql://user:password@localhost:5432/easy_reminder"
JWT_SECRET="your-jwt-secret"
TWILIO_ACCOUNT_SID="sid"
TWILIO_AUTH_TOKEN="token"
TWILIO_PHONE_NUMBER="phone-number"
```
### Run the application 
```
cd backend && npm run dev
cd frontend && npm run dev
```
## API endpoints
### Authentication 
- ```POST /api/auth/register``` - User registration
- ```POST /api/auth/login``` - User login
### Reminders 
- ```GET /api/reminders ``` - Get user reminders
- ``` POST /api/reminders``` - Create new reminder
- ```DELETE /api/reminders/:id ``` - Delete reminder
### Emergency 
- ``` POST /api/sos/trigger ``` - Trigger emergency alert
- ``` GET /api/sos/history``` - Get SOS history



https://github.com/user-attachments/assets/ffdf5cff-9e88-40ae-a04c-2d7780829299


