const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const controllers = require("./controllers");
const router = require("./router");
const app = express();

app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/api/v1", router);

const PORT = process.env.PORT || 773;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
