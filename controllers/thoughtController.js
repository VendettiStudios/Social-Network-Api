const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('posts')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new Thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
  
    deleteThought(req,res){
        Thought.findOneAndDelete({_id:thoughtId})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res){
        Thought.update({_id:req.params.thoughtId}, req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  
    },
    addReaction(req, res){
      Thought.findOneAndUpdate({_id:req.params.thoughtId},{$addToSet:{reaction:req.params.reactionId}},{new:true})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res){
        Thought.findOneAndUpdate({_id:req.params.thoughtId}, {$pull:{reaction:req.params.reactionId}},{new:true})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
    },
  };
  