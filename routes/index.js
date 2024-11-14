const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const signupRouter = require("./signup");
const { ERROR_MESSAGES } = require("../utils/errors");
const signinRouter = require("./signin");
const NotFoundError = require("../errors/not-found-error");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/signup", signupRouter);
router.use("/signin", signinRouter);
router.use((req,res,next) => {
  next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
});

module.exports = router;
