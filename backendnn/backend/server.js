require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const registrationRoutes = require("./routes/registrations");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const errors = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();
app.use(helmet());
const frontendOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: frontendOrigin,
  credentials: true,
}));

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// Reject browser requests that change data from another origin.
app.use((req, res, next) => {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];

  if (
    !safeMethods.includes(req.method) &&
    req.get("Origin") !== frontendOrigin
  ) {
    return res.status(403).json({
      message: "Request origin not allowed",
    });
  }

  next();
});

// Logger BEFORE routes
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// Error middleware MUST be after all routes
app.use(errors.notFound);
app.use(errors.errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err.message));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});