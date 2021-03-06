const { Schema, model, Types } = require('mongoose');
//ADD DATE FORMATTING
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
            },
        username: {
            type: String,
            required: true,
            },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
    }
);


//get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//create the Thought model using the Thought Schema
const Thought = model('Thought', ThoughtSchema);

//export the User model
module.exports = Thought;