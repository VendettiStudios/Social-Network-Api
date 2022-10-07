const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {console.log(res.json);res.json(dbUserData)})
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req,res){
    User.findOneAndDelete({_id:req.params.userId})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res){
    User.update({_id:req.params.userId}, req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));

  },
  
  addFriend(req, res){
    User.findOneAndUpdate({_id:req.params.userId},{$push:{friends:req.body.friendId}},{new:true})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res){
    User.findOneAndUpdate({_id:req.params.userId}, {$pull:{friends:req.body.friendId}},{new:true})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },
};
