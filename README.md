# 🛒 Shopping List Application

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack shopping list application built with cutting-edge technologies! ✨

## 🏗️ Project Structure

The project is organized into three main directories:
- 📱 `client/` - React frontend built with Vite
- 🖥️ `server/` - Node.js/Express backend
- 🤝 `shared/` - Shared TypeScript types and utilities

## 📋 Prerequisites

Before running the application, make sure you have the following installed:
- 📦 Node.js (v18 or higher)
- 📦 npm
- 🐳 Docker
- 🐳 Docker Compose

## 🚀 Setup Instructions

### 1️⃣ Install Dependencies

First, install dependencies for all parts of the application:

```bash
# installs all needed dependencies
npm i
```

### 2️⃣ Database Setup

The application uses MongoDB running in Docker:

1. Start the MongoDB container:
   ```bash
   docker compose up -d
   ```

2. The MongoDB instance will be available at:
   - 🏠 Host: localhost
   - 🔌 Port: 27017
   - 👤 Username: root
   - 🔑 Password: example
   - 🔐 Authentication Database: admin

### 3️⃣ Environment Setup

Create a `.env` file in the server directory with:
```env
MONGODB_URI=mongodb://root:example@localhost:27017/shopping-list?authSource=admin
PORT=3000
```

## 🎮 Running the Application

### 💻 Development Mode

```bash
# This will start all dev environments
npm run dev
```

The application will be available at:
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:3000

### 🚀 Production Mode

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

## 🛑 Stopping the Application

1. Stop the development servers by pressing `Ctrl+C` in their respective terminal windows.

2. Stop the MongoDB container:
```bash
docker-compose down
```

To remove all MongoDB data:
```bash
docker-compose down -v
```

## 🛠️ Tech Stack

- **Frontend** 🎨:
  - ⚛️ React
  - 📝 TypeScript
  - ⚡ Vite
  - 🎨 Tailwind CSS
  - 🎯 shadcn/ui
  - 🎪 Radix UI
  - 🔄 React Query

- **Backend** 🔧:
  - 💚 Node.js
  - 🚂 Express
  - 📝 TypeScript
  - 🍃 MongoDB with Mongoose
  - 🔄 CORS
  - ⚖️ Rate Limiting
  - 🔄 concurrently

- **Shared** 🤝:
  - 📝 TypeScript
  - 🗄️ MongoDB types
