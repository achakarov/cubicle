const { Router } = require('express');
const accessoryService = require('../services/accessoryService');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory');
});

//TODO: Create validation middleware or just validate incoming data
router.post('/create', isAuthenticated, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch((err) => {
            let error = Object.keys(err?.errors).map(x => ({ message: err.errors[x].properties.message }))[0];
            res.render('createAccessory', { error });
        });
});

module.exports = router;