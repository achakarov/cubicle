const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('./helpers/productHelpers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = Router();

router.get('/', (req, res) => {

    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end());
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuthenticated, (req, res) => {

    productService.create(req.body, req.user)
        .then(() => res.redirect('/products'))
        .catch((err) => {
            let error = Object.keys(err?.errors).map(x => ({ message: err.errors[x].properties.message }))[0];
            res.render('create', { error });
        });
});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getOneWithAccesories(req.params.productId)

    res.render('details', { title: 'Product Details', product });
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllUnattached(product.accessories);

    res.render('attachAccessory', { product, accessories });
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
        .catch(() => res.status(500).end());
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCubePage', product);
        });
});

//TODO Show the edit & delete buttons only if I am the creator

router.post('/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:productId/delete', isAuthenticated, (req, res) => {

    productService.getOne(req.params.productId)
        .then(product => {
            res.render('deleteCubePage', product);
        });

});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(response => res.redirect('/products'))
        .catch(err => console.log(err));
});


module.exports = router; 