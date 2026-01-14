const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 🔹 Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger/swagger");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;


