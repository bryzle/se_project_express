const router = require('express').Router();
const clothingItem = require('../controllers/clothingItems');

const {getItems,deleteItem,addItem, likeItem,dislikeItem} = clothingItem;

router.get('/',getItems);
router.delete('/:itemId',deleteItem);
router.post('/',addItem);
router.put('/:itemId/likes',likeItem);
router.delete('/:itemId/likes',dislikeItem);

module.exports=router;