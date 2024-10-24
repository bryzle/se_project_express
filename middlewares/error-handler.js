module.exports = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  if (err.joi) {
    return res.status(400).send({ message: err.joi.details[0].message });
  }

  res.statusCode.send({
    message: statusCode === 500 ? "An error occured on the server" : message,
  });
};
