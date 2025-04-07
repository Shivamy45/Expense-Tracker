# Expense Tracker

A modern, full-stack expense tracking application built with Next.js, featuring real-time analytics, AI-powered insights, and secure authentication.

## Features

- 📊 Real-time expense tracking and analytics
- 🔐 Secure authentication with Clerk
- 🤖 AI-powered financial insights using Google's Generative AI
- 📱 Responsive design with modern UI components
- 🌙 Dark/Light mode support
- 📧 Email notifications
- 📈 Interactive charts and visualizations
- 🔄 Real-time data updates

## Tech Stack

- **Framework:** Next.js 15
- **Authentication:** Clerk
- **Database:** Prisma ORM
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Forms:** React Hook Form
- **Validation:** Zod
- **Email:** React Email
- **AI Integration:** Google Generative AI
- **State Management:** React Hooks

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn
- A Clerk account for authentication
- A Google AI API key
- A Resend account for email functionality

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Add your environment variables here
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── actions/         # Server actions
├── app/            # Next.js app directory
├── components/     # Reusable UI components
├── data/          # Data utilities
├── emails/        # Email templates
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── prisma/        # Database schema and migrations
└── public/        # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run email` - Start email development server
