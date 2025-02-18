const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jokesRouter = require("./routes/api/jokesRouter")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jokes", jokesRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;