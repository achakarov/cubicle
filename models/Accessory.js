const mongoose = require('mongoose');
const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9\s]+$/;

const accesorySchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => `${props.value}is invalid accessory name. It should contain only English letters, digits and whitespaces!`
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
});

module.exports = mongoose.model('Accessory', accesorySchema); 