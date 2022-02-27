const {Schema, model} = require('mongoose');

const NAME_PATTERN = /^[A-z]+ [A-z]+$/;

const userSchema = new Schema({
    name: {type: String, required: true, validate: {
        validator(value) {
            return NAME_PATTERN.test(value);
        },
        message: 'Name must be valid'
    }},
    username: {type: String, required: true, minlength: [5, 'The username should be at least 5 characters long']},
    hashedPassword: {type: String, required: true}
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