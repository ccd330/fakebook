const { Schema, model } = require('mongoose');
//ADD DATE FORMATTING
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true ,
        trim: true
        },
        thoughts: [
            {
                type: ,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: .
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
    }
);

//get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.count.length + 1, 0);
});

//create the User model using the User Schema
const User = model('User', UserSchema);

//export the User model
module.exports = User;