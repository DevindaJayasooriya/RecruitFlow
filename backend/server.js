const express = require("express");
const app = express();
const db = require("./src/config/dbConfig");
const candidateRoutes = require("./src/routes/candidateRoutes");
const cors = require("cors");

const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/api/candidates', candidateRoutes);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
