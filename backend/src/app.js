const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5174",
    "https://task-management-system-seven-gilt.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;




