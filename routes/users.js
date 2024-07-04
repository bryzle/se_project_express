const router = require('express').Router();
const user = require('../models/user');

router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',createUser);