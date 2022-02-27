    const {Schema, model, Types: {ObjectId}} = require('mongoose');

    const URL_PATTERN = /^https?:\/\/(.+)$/;

    const tripSchema = new Schema({
        start: {type: String, required: true, minlength: [4, 'The Starting Point should be at least 4 characters long (each).']},
        end: {type: String, required: true, minlength: [4, 'The End Point should be at least 4 characters long (each).']},
        date: {type: String, required: true},
        time: {type: String, required: true},
        carImg: {type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'The Car Image starts with http:// or https://'
        }},
        carBrand: {type: String, required: true, minlength: [4, 'The Car Brand should be minimum 4 characters long.']},
        seats: {type: Number, required: true, min: 0, max: 4},
        price: {type: Number, required: true, min: 1, max: 50},
        description: {type: String, required: true, minlength: [10, 'The Description should be minimum 10 characters long.']},
        owner: {type: ObjectId, ref:'User', required: true},
        buddies: {type: [ObjectId], ref:'User', default: []},
    });

    const Trip = model('Trip', tripSchema);

    module.exports = Trip;

