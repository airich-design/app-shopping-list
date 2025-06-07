import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
