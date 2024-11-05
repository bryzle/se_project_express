const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const error = new Error(ERROR_MESSAGES.AUTHORIZATION_ERROR);
  if (!authorization || !authorization.startsWith("Bearer")) {

      error.status = ERROR_CODES.AUTHORIZATION_ERROR;
      return next(error);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    error.status = ERROR_CODES.AUTHORIZATION_ERROR;
    return next(error);
  }

  req.user = payload;

};

module.exports = auth;
