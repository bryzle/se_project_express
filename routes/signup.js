const router = require("express").Router();
const user = require("../controllers/users");

const { createUser } = user;

router.post("/", createUser);

module.exports = router;
