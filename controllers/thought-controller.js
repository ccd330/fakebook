const { Thought, User} = require('../models');

const thoughtController = {
    // add thought to user
    // GET /api/thougts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            // sorts in descending order
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one thought by id
    // destructured params from req
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    // sets id to the user ID of choice
                    { _id: body.userId },
                    // pushes thought to array
                    { $push: { thoughts: _id } },
                    // will return collection not updated if set to false
                    // when set to true it will return user with updated thought
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // update thought by id
    // PUT /api/thoughts/:id
    updateThought({ params, body }, res) {
        // set third parameter to true because if it will return original document if not
        // Updates and returns as a response through the find one
        // need to add runValidators to true to let it know that it needs to validate info when updating data
        Thought.findOneAndUpdate({ _id: params.id }, body,  { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user
    // DELETE /api/thought/:id
    deleteThought({ params }, res) {
        // Updates and returns as a response through the find one
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            // sets id to the thought ID of choice
            { _id: params.id },
            // pushes reactions to array
            { $push: { reactions: body } },
            // will return collection not updated if set to false
            // when set to true it will return thought with updated reactions
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    removeReaction({ params }, res) {
        // Updates and returns as a response through the find one
        Thought.findOneAndUpdate(
            // sets id to the thought ID of choice
            { _id: params.id },
            // pushes reactions to array and use reactionId as a params.reactionId
            { $pull: { reactions: { reactionId: params.reactionId } } },
            // will return collection not updated if set to false
            // when set to true it will return thought with updated reactions
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;