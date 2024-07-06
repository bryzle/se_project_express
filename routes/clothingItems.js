const router = require('express').Router();
const clothingItem = require('../controllers/clothingItems');

const {getItems,deleteItem,addItem} = clothingItem;

router.get('/items',getItems);
router.delete('/items/:itemId',deleteItem);
router.post('/items',addItem);

module.exports=router;