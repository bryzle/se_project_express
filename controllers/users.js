const user = require("../models/user");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

/* module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR })
    );
};
 */

module.exports.getCurrentUsers = (req, res) => {
  console.log("getCurrentUsers");
  const userId = req.user._id;

  user
    .findById(userId)
    .select("-password")
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
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

      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR })
    });

  // Your code logic here
};

module.exports.getUser = (req, res) => {
  console.log("getUser");
  user
    .findById(req.params.id)
    .select("-password")
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
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

      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.createUser = async (req, res) => {
  console.log("createUser");
  const { name, avatar, email, password } = req.body;

  // Validate required fields
  if (!name || !avatar || !email || !password) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  try {
    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(ERROR_CODES.CONFLICT)
        .send({ message: ERROR_MESSAGES.CONFLICT });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await user.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return res.send(newUser);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(ERROR_CODES.BAD_REQUEST)
        .send({ message: ERROR_MESSAGES.BAD_REQUEST });
    }
    if (err.code === 11000) {
      // Handle MongoDB duplicate error
      return res
        .status(ERROR_CODES.CONFLICT)
        .send({ message: ERROR_MESSAGES.CONFLICT });
    }
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
    return res
      .status(ERROR_CODES.SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};

module.exports.login = (req, res) => {
  console.log("login");
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }
  return user
    .findUserByCredentials( email, password )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })

    .catch((err) => {
      console.error(err);

      res.status(401).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  console.log("updateUser");
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const updates = {};
  if (name) updates.name = name;
  if (avatar) updates.avatar = avatar;

  user
    .findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return user.updateOne(updates);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ msg: "Validation Error", errors: err.errors }); // Handle validation errors
      }
      next(err); // Pass the error to the error handling middleware
    });
};
