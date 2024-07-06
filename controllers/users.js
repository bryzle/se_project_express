const user = require("../models/user");

/* router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',createUser); */

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => {res.status(200).
  res.send(users)})
    .catch((err) => {return res.status(500).send({ message: err.message })});
};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.id)
    .then((user) => res.send( user ))
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.createUser = (req, res) => {
  const {name, avatar} = req.body;
  console.log(name,avatar)
  user
    .create({name, avatar})
    .then((user) => res.status(201).res.send( user ))
    .catch((err) =>{console.error(err); res.status(500).send({ message: "Error" })});
};
