const mongoose = require('mongoose');
const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/; 
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => `${props.value}is invalid username. It should contain only English letters or digits!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => `Password should contain only English letters or digits!`
        }
    },
    
});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(this.password, salt);
        })
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            // TODO:
            console.log(err);
        });
});

module.exports = mongoose.model('User', userSchema); 