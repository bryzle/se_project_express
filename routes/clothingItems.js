const router = require('express').Router();
const clothingItem = require('../controllers/clothingItems');

const {getItems,deleteItem,addItem, likeItem,dislikeItem} = clothingItem;

router.get('/',getItems);
router.delete('/:itemId',deleteItem);
router.post('/',addItem);
router.put('/:itemId',likeItem);
router.delete('/:itemId',dislikeItem);

module.exports=router;