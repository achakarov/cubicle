const mongoose = require('mongoose');
const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9\s]+$/;

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => `${props.value}is invalid cube name. It should contain only English letters, digits and whitespaces!`
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => 'Description should be at least 20 characters long'
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Cube', cubeSchema);