
import express from "express";
import cors from "cors";
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
/* Middlewares */
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


/* Test Route */
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;