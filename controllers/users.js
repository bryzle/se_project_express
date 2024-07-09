const user = require("../models/user");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");



module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then(users =>
      res.status(200).send(users)
    )
    .catch(() =>
       res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR }))

};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.id)
    .orFail()
    .then(users => res.status(200).send(users))
    .catch((err) => {
      if (err.name === "CastError") {

        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid user ID format." });
      }
      if (err.name === "DocumentNotFoundError") {

        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      if (err.name === "") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.createUser = (req, res) => {
  console.log(req.user._id);
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  console.log(name, avatar);
  user
    .create({ name, avatar })
    .then((users) => res.status(201).send(users))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};
