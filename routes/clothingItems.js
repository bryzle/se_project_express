const router = require('express').Router();
const clothingItem = require('../models/clothingItem');

router.get('/items',getItems);
router.delete('/items/:itemId',deleteItem);
router.post('/items',addItem);