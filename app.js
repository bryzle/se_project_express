require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./middlewares/rateLimit");
const mainRouter = require("./routes/index");


const app = express();
const { PORT = 3001 } = process.env;



app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {
});

app.use("/", mainRouter);

app.use(errorLogger); // Log errors after routes
app.use(errors()); // Celebrate errors
app.use(errorHandler); // Centralized error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});