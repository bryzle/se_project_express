const router = require("express").Router();
const user = require("../controllers/users");
const {validateNewUser} = require("../middlewares/validation")
const { createUser } = user;

router.post("/",validateNewUser, createUser);

module.exports = router;
