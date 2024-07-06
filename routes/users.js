const router = require('express').Router();
const user = require('../controllers/users');

const {getUsers,getUser,createUser} = user;

router.get('/',(getUsers));
router.get('/:id',getUser);
router.post('/',createUser);

module.exports=router;