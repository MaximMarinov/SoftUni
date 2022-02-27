const {Schema, model, Types: {ObjectId}} = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)$/;

const publicationSchema = new Schema({
    title: {type: String, required: true, minlength: [6, 'The Title should be a minimum of 6 characters long.']},
    technique: {type: String, required: true, maxlength: [15, 'The Painting technique should be a maximum of 15 characters long.']},
    img: {type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'The Art picture should start with http:// or https://'
    }},
    certificate: {type: String, required: true, enum: ['Yes', 'No']},
    author: {type: ObjectId, ref:'User'},
    usersShared: {type: [ObjectId], ref:'User', default: []},
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;

