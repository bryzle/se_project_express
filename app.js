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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/wtwr_db";



app.use(helmet());
app.use(cors({
  origin: ['https://wtwr.brandonlum.com','http://localhost:3000' ], // your frontend domain
  credentials: true, // if you're using cookies/auth
}));
app.use(express.json());
app.use(limiter);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

mongoose.connect(MONGODB_URI).then(() => {
});

if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    req.user = {
      _id: '5d8d8592978f8bd833ca8133',
    };
    next();
  });
}

app.use("/", mainRouter);

app.use(errorLogger); // Log errors after routes
app.use(errors()); // Celebrate errors
app.use(errorHandler); // Centralized error handler




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});