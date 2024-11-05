const router = require("express").Router();
const user = require("../controllers/users");
const auth = require("../middlewares/auth");
const {validateId} = require('../middlewares/validation')

const { getCurrentUsers, getUser, updateUser  } = user;


router.get("/me", auth, getCurrentUsers);

router.patch("/me", auth, updateUser);

module.exports = router;
