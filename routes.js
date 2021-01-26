const { Router } = require('express');
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');

const router = Router();

router.use('/products', productController);
router.use('/', homeController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;