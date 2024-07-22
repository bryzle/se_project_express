const ERROR_CODES = {
  BAD_REQUEST: 400,
  AUTHORIZATION_ERROR: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409,
};

const ERROR_MESSAGES = {
  BAD_REQUEST:
    "Invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.",
  AUTHORIZATION_ERROR: "Authorization required",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND:
    "No user or clothing item with the requested id, or the request was sent to a non-existent address.",
  SERVER_ERROR: "An error has occurred on the server.",
  CONFLICT: "The user already exists in the database.",
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};
