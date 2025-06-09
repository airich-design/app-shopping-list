import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import itemsRouter from "./routes/items";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/items", itemsRouter);

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "Shopping List API is running" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
