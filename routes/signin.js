const router = require("express").Router();
const user = require("../controllers/users");
const { validateUserLogin } = require("../middlewares/validation");

const { login } = user;

router.post("/", validateUserLogin, login);

module.exports = router;
