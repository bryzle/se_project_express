const router = require("express").Router();
const user = require("../controllers/users");
const auth = require("../middlewares/auth");

const { getCurrentUsers, getUser, updateUser } = user;

router.get("/:id", auth, getUser);
router.get("/me", auth, getCurrentUsers);
router.patch("/me", auth, updateUser);

module.exports = router;
