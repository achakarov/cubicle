const { Router } = require('express');
const productService = require('../services/productService');
const router = Router()

router.get('/', (req, res) => {
    let products = productService.getAll();
    res.render('home', { title: 'Home', products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', validateProduct, (req, res) => {
    //TO DO: Validate inputs
    productService.create(req.body);
    res.redirect('/products');
});

router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId);
    res.render('details', { title: 'Product Details', product });
});

function validateProduct(req, res, next) {
    let isValid = true;

    if (req.body.name.trim().length < 2) {
        isValid = false;
    } else if (!req.body.imageUrl) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
}


module.exports = router; 