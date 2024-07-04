const clothingItem = require("../models/clothingItem");

router.get('/items',getItems);
router.delete('/items/:itemId',deleteItem);
router.post('/items',addItem);

module.exports.getItems =  (req, res) => {
  clothingItem.find({})
  .then(items =>  res.send({data:items}))
  .catch(() => res.status(500).send({message:'Error'}))};

module.exports.deleteItem = (req, res) => {
  clothingItem.findByIdAndDelete(req.params.itemId)
  .then(item =>  res.send({data:item}))
  .catch(() => res.status(500).send({message:'Error'}))};

module.exports.addItem = (req, res) => {
  clothingItem.create(req.body)
  .then(item =>  res.send({data:item}))
  .catch(() => res.status(500).send({message:'Error'}))};