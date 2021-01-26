const uniqid = require('uniqid');
const Cube = require('../models/Cube');

function createProduct(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    
}

module.exports = {
    createProduct
}