const user = require("../models/user");

/* router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',createUser); */

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.createUser = (req, res) => {
  user
    .create(req.body)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Error" }));
};
