const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const signupRouter = require("./signup");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const signinRouter = require("./signin");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/signup", signupRouter);
router.use("/signin", signinRouter);
router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send(ERROR_MESSAGES.NOT_FOUND);
});


module.exports = router;
