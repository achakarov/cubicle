const { Router } = require('express');
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/products', productController);
router.use('/auth', authController); 
router.use('/accessories', accessoryController);
router.use('/', homeController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;