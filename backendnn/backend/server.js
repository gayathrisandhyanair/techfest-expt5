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

const app = express();
app.use(helmet());
app.use(cors());

app.use(express.json());

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