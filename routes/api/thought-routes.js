const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//GET all thoughts and POST thoughts
router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//Set up GET one, PUT, and DELETE thought by id
router 
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//set up POST reaction 
router 
    .route('/:id/reactions')
    .post(createReaction)

//set up DELETE reaction
router 
    .route('/:id/reactions/:reactionid')
    .delete(deleteReaction)

module.exports = router
