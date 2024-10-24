const router = require("express").Router();
const clothingItem = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { getItems, deleteItem, addItem, likeItem, dislikeItem } = clothingItem;
const {
  validateId,
  validateClothingItem,
} = require("../middlewares/validation");

router.get("/", getItems);
router.delete("/:itemId", validateId, auth, deleteItem);
router.post("/", auth, validateClothingItem, addItem);
router.put("/:itemId/likes", validateId, auth, likeItem);
router.delete("/:itemId/likes", validateId, auth, dislikeItem);

module.exports = router;
