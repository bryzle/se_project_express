const router = require("express").Router();
const user = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

const { getCurrentUsers, updateUser } = user;

router.get("/me", auth, getCurrentUsers);

router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;
