const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: (props) => `${props.value}is invalid username. It should contain only English letters or digits!`,
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

module.exports = mongoose.model('User', userSchema); 