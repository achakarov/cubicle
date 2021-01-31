const uniqid = require('uniqid');
const Cube = require('../models/Cube');
// const fs = require('fs');
// const path = require('path');
const productData = require('../data/productData');

function getAll(query) {
    let products = productData.getAll();
    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        products = products.filter(x => Number(x.difficultyLevel) >= query.from);
    }

    if (query.to) {
        products = products.filter(x => Number(x.difficultyLevel) <= query.to);
    }

    return products;
}

function getOne(id) {
    return productData.getOne(id);
}

function create(data, callback) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );


    // fs.writeFile(path.join(__dirname + '/../config/products.json'), JSON.stringify(productsData), callback);
    // return productData.create(cube);
   return cube.save();
}

module.exports = {
    create,
    getAll,
    getOne
}