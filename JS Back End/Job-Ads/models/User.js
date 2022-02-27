const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z-]+)@([a-zA-Z-]+)\.([a-zA-Z-]+)$/;

const userSchema = new Schema({
    email: {type: String, required: true, validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'The email should be in the following format: <name>@<domain>.<extension> '
    }},
    hashedPassword: {type: String, required: true},
    description: {type: String, required: true, maxlength: [40, 'The description of skills should be a maximum of 40 characters long']},
    myAds: {type: [ObjectId], ref:'Ad', default: []},
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strenght: 2
    }
});

const User = model('User', userSchema);

module.exports = User;