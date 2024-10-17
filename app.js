const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const app = express();
const { PORT = 3001 } = process.env;
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(cors());
const mainRouter = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {});

app.use(express.json());

app.use("/", mainRouter);
app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
