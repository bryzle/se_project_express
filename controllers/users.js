const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const {  ERROR_MESSAGES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const NotFoundError = require("../errors/not-found-error");
const AuthorizationError = require("../errors/authorization-error");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");


module.exports.getCurrentUsers = (req, res,next) => {
  const userId = req.user._id;

  user
    .findById(userId)
    .select("-password")
    .then((users) => {
      if (!users) {
        throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
      }

      return res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }

      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
      }

      next(err);
    });
};


module.exports.createUser = async (req, res,next) => {
  const { name, avatar, email, password } = req.body;

  // Validate required fields
  if (!name || !avatar || !email || !password) {
    throw new BadRequestError(ERROR_MESSAGES.BAD_REQUEST);
  }

  try {
    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      throw new ConflictError(ERROR_MESSAGES.Conflict);
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
    if (err.name === "ValidationError") {
      next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
    }
    if (err.code === 11000) {
      // Handle MongoDB duplicate error
      next(new ConflictError(ERROR_MESSAGES.Conflict));
    }

   return next(err);
  }
};

module.exports.login = (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(ERROR_MESSAGES.BAD_REQUEST);
  }
  return user
    .findUserByCredentials(email, password)
    .then((users) => {

      const token = jwt.sign({ _id: users._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })

    .catch((err) => {

      if (err.message === "Incorrect email or password") {
        next(new AuthorizationError(ERROR_MESSAGES.AUTHORIZATION_ERROR));
      }

      next(err);
    });
};

module.exports.updateUser = (req, res,next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const updates = {};
  if (name) updates.name = name;
  if (avatar) updates.avatar = avatar;

  return user
    .findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
    .then((users) => {
      if (!users) {
        throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
      }
      return res.send(users);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }
      next(err);
    });
};
