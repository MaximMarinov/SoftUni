const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose');

//const NAME_PATTERN = /^[A-z]+ [A-z]+$/;
const URL_PATTERN = /^https?:\/\/(.+)$/;

const housingSchema = new Schema({
    name: {type: String, required: true, minlength: [5, 'The housing name should be at least 5 characters long']},
    type: {type: String, required: true},
    year: {type: Number, required: true, min: 1850, max: 2021},
    city: {type: String, required: true, minlength: [4, 'The city name should be at least 5 characters long']},
    housingImg: {type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'The housing image link must start with http:// or https://'
    }},
    description: {type: String, required: true, maxlength: [60, 'The description should be atmost 60 characters long']},
    available: {type: Number, required: true, min: 0, max: 10},
    rentors: {type: [ObjectId], ref:'User', default: []},
    owner: {type: ObjectId, ref:'User'},
});

const Housing = model('Housing', housingSchema);

module.exports = Housing;