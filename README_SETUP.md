# Vercel Postgres Setup Guide

This project uses Vercel Postgres for the cloud database.

## Setup Instructions

### 1. Create Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Click "Create Database" and select "Postgres"
4. Follow the prompts to create your database

### 2. Environment Variables

After creating the database, Vercel will automatically set the following environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 3. Local Development

For local development, you have two options:

#### Option A: Use Vercel Postgres locally

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull .env`
4. Run your development server: `npm run dev`

#### Option B: Use a local database

You can use the existing SQLite setup for local development:
- Run the server: `cd server && node server.js`
- Set `VITE_API_BASE_URL=http://localhost:3001/api` in your `.env` file

### 4. Database Schema

The database will be automatically initialized with the following schema:

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  reply TEXT,
  admin_name TEXT,
  replied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. API Endpoints

- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create a new comment
- `DELETE /api/comments/:id` - Delete a comment
- `PUT /api/comments/:id/reply` - Reply to a comment

## Notes

- The `@vercel/postgres` package is deprecated. Consider migrating to Neon for new projects.
- The database schema is automatically created on the first API call.
- Admin password is set via `VITE_ADMIN_PASSWORD` environment variable (default: `vaffel2026`).
