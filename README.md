# Candidate Management System API

A RESTful backend API for a Candidate Management System built with Node.js, Express.js, and MongoDB.

## Features

- **Candidate Authentication**: Registration and Login using JWT.
- **Profile Access**: Candidates can access their own profiles.
- **Admin Management**: Admin can list all candidates with pagination.
- **Security**: Password hashing with bcrypt, JWT protection, and RBAC.
- **Error Handling**: Centralized error management middleware.
- **MVC Architecture**: Clearly separated controllers, models, and routes.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs
- **Other**: dotenv, cors

## Prerequisites

- Node.js installed
- MongoDB installed and running locally

## Setup

1. Clone the repository or extract the files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (one is already provided with defaults):
   ```env
   PORT=5000
   MONGODB_URI=mongodb_url
   JWT_SECRET=supersecretkey123
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Auth
- `POST /auth/register`: Register a new candidate.
- `POST /auth/login`: Login and get JWT token.

### Candidates
- `GET /candidates/me`: Get current logged-in candidate profile (Requires JWT).

### Admin
- `GET /admin/candidates`: List all candidates (Requires JWT + Admin role).
  - Supports pagination: `?page=1&limit=10`

## Authentication Flow

1. **Register/Login**: User sends credentials to `/auth/register` or `/auth/login`.
2. **Token Generation**: Server validates credentials and returns a JWT access token.
3. **Protected Routes**: Client includes the token in the `Authorization` header as `Bearer <token>` for subsequent requests.

## How to test Admin functionality

To test admin functionality, you can register a user with the field `"role": "admin"` in the request body of `POST /auth/register`. By default, users are registered with the `"candidate"` role.
