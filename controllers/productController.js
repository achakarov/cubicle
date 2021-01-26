const { Router } = require('express');
const productService = require('../services/productService');
const { validateProduct } = require('./helpers/productHelpers');
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
    productService.create(req.body, (err) => {
        if (err) {
            return res.status(400).end()
        }

        res.redirect('/products');
    });
});

router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId);
    res.render('details', { title: 'Product Details', product });
});


module.exports = router; 