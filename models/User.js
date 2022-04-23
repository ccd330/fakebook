const { Schema, model } = require('mongoose');
//ADD DATE FORMATTING
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
        trim: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
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

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//create the User model using the User Schema
const User = model('User', UserSchema);

//export the User model
module.exports = User;