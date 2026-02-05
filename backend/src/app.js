
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

/* Middlewares */
//app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-maneger.vercel.app"
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
