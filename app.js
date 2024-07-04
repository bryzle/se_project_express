const express = require("express");

const { PORT = 3001 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');