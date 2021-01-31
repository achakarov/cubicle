const mongoose = require('mongoose');

const accesorySchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
});

module.exports = mongoose.model('Accessory', accesorySchema); 