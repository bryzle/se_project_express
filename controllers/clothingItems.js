const clothingItem = require("../models/clothingItem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const conflictError = require("../errors/conflict-error");
const forbiddenError = require("../errors/forbidden-error");
const serverError = require("../errors/server-error");

module.exports.getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.send(items))
    .catch(() => next(new serverError(ERROR_MESSAGES.SERVER_ERROR)));
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  return clothingItem
    .findById(itemId)
    .then((item) => {
      if (!item) {
        throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
      }

      if (String(item.owner) !== req.user._id) {
        throw new forbiddenError(ERROR_MESSAGES.FORBIDDEN);
      }

      return item.deleteOne().then(() => res.send({ message: "Item deleted" }));
    })

    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }
      next(new serverError(ERROR_MESSAGE.SERVER_ERROR));
    });
};

module.exports.addItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    throw new BadRequestError(ERROR_MESSAGES.BAD_REQUEST);
  }

  return clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }
      next(new serverError(ERROR_MESSAGES.SERVER_ERROR));
    });
};

module.exports.likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.json(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }
      next(new serverError(ERROR_MESSAGES.SERVER_ERROR));
    });
};

module.exports.dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
      }

      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }

      next(new serverError(ERROR_MESSAGES.serverError));
    });
};
