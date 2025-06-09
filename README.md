# Shopping List Application

This is a full-stack shopping list application built with React, Node.js, and MongoDB.

## Project Structure

The project is organized into three main directories:
- `client/` - React frontend built with Vite
- `server/` - Node.js/Express backend
- `shared/` - Shared TypeScript types and utilities

## Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v18 or higher)
- npm
- Docker
- Docker Compose

## Setup Instructions

### 1. Install Dependencies

First, install dependencies for all parts of the application:

```bash
# installs all needed dependencies
# --force is required due to React 19 and potential peer dependency conflicts with Shadcn UI components
npm i --force
```

### 2. Database Setup

The application uses MongoDB running in Docker:

1. Start the MongoDB container:
   ```bash
   docker-compose up -d
   ```

2. The MongoDB instance will be available at:
   - Host: localhost
   - Port: 27017
   - Username: root
   - Password: example
   - Authentication Database: admin

### 3. Environment Setup

Create a `.env` file in the server directory with:
```env
MONGODB_URI=mongodb://root:example@localhost:27017/shopping-list?authSource=admin
PORT=3000
```

## Running the Application

### Development Mode

```bash
# This will start all dev environements
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Production Mode

1. Build the shared package:
```bash
cd shared
npm run build
```

2. Build and start the server:
```bash
# Will build client, server and shared
npm run build
# Will start everything
npm run start
```

## Stopping the Application

1. Stop the development servers by pressing `Ctrl+C` in their respective terminal windows.

2. Stop the MongoDB container:
```bash
docker-compose down
```

To remove all MongoDB data:
```bash
docker-compose down -v
```

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - shadcn/ui
  - Radix UI
  - React Query

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - MongoDB with Mongoose
  - CORS
  - Rate Limiting
  - concurrently

- **Shared**:
  - TypeScript
  - MongoDB types
