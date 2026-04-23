# Node.js CRUD API Bootcamp

A simple Express-based CRUD API scaffold for user resources.

## Overview

This project is a starter backend implementation that currently includes:

- Express server setup
- Versioned API routing (`/api/v1`)
- User route definitions for CRUD operations
- Placeholder user controller methods
- MongoDB connection helper (ready to integrate)
- Animated homepage at `/`

## Tech Stack

- Node.js
- Express 5
- Mongoose
- dotenv
- bcrypt (installed for future auth/password hashing)
- cors (installed for future cross-origin support)

## Project Structure

```text
.
|-- controllers/
|   `-- user.controller.js
|-- lib/
|   `-- mongodb.connect.js
|-- models/
|   `-- user.model.js
|-- routers/
|   `-- user.route.js
|-- server.js
`-- package.json
```

## How It Works

### 1) Server Bootstrap

`server.js` creates an Express app, enables JSON + URL-encoded body parsing, mounts versioned routes, and starts the server on port `3000`.

It also exposes a homepage (`GET /`) that returns an animated HTML landing screen with:

- Floating background shapes
- Card reveal animation
- Staggered route list entrance animation

### 2) Routing Layer

`routers/user.route.js` defines endpoint groups:

- `GET /api/v1/users` -> list users
- `POST /api/v1/users` -> create user
- `GET /api/v1/users/:id` -> get one user
- `PUT /api/v1/users/:id` -> update user
- `DELETE /api/v1/users/:id` -> delete user

### 3) Controller Layer

`controllers/user.controller.js` currently contains placeholder implementations that return descriptive JSON responses.

This means endpoint wiring is complete, while data persistence logic is not implemented yet.

### 4) Model Layer

`models/user.model.js` is present but currently empty.

This is where your Mongoose schema/model should be added.

### 5) Database Helper

`lib/mongodb.connect.js` exports `connectDB()` to connect to MongoDB using `process.env.MONGO_URI`.

At the moment, this helper is not called from `server.js` yet.

## API Endpoints (Current Responses)

### `GET /api/v1/users`

```json
{ "message": "Get all users" }
```

### `POST /api/v1/users`

```json
{ "message": "Create a new user" }
```

### `GET /api/v1/users/:id`

```json
{ "message": "Get user with ID <id>" }
```

### `PUT /api/v1/users/:id`

```json
{ "message": "Update user with ID <id>" }
```

### `DELETE /api/v1/users/:id`

```json
{ "message": "Delete user with ID <id>" }
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file (or copy from `.env.example`) and set:

```env
MONGO_URI=your_mongodb_connection_string
```

3. Run the project in development:

```bash
npm run dev
```

4. Open:

- Homepage: `http://localhost:3000/`
- API base: `http://localhost:3000/api/v1`

## Suggested Next Steps

- Implement `User` schema in `models/user.model.js`
- Wire `connectDB()` into `server.js` startup
- Replace controller placeholders with real MongoDB CRUD logic
- Add validation and centralized error handling
- Add tests for API routes/controllers
