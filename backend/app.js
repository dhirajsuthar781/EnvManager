import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
import healthRoute from "./routes/health.route.js";
import authRoute from "./routes/auth.route.js";

app.use("/api/v1", healthRoute);
app.use("/api/v1/auth", authRoute);

// Default
app.get("/", (req, res) => {
  res.send("Api Is Running..");
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
