const fs = require('fs/promises');
const path = require('path');
let productsDb = require('../config/products.json');

class Cube {
    constructor(id, name, description, imageUrl, difficultyLevel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }

    save() {
        productsDb.push(this);

        return fs.writeFile(
            path.join(__dirname + '/../config/products.json'),
            JSON.stringify(productsDb)
        );
    }

    static getAll() {
        return productsDb;
    }
    
    static getOne(id) {
        return productsDb.find(x => x.id === id);
    }
}

module.exports = Cube;