const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {

  })


app.use((req, res, next) => {
  req.user = {
    _id: "668c4410b77e87065432b14c", // paste the _id of the test user created in the previous step
  };
  next();
});

app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT);
