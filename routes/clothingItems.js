const router = require("express").Router();
const clothingItem = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

const { getItems, deleteItem, addItem, likeItem, dislikeItem } = clothingItem;

router.get("/", getItems);
router.delete("/:itemId", auth, deleteItem);
router.post("/", auth, addItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
