const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, minlength: [4, 'The username should be at least 4 characters long']},
    hashedPassword: {type: String, required: true},
    address: {type: String, required: true, maxlength: [20, 'The address should be a maximum of 20 characters long']},
    myPublications: {type: [ObjectId], ref:'Publication', default: []},
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strenght: 2
    }
});

const User = model('User', userSchema);

module.exports = User;