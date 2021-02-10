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
        .catch(() => res.status(500).end());
});

module.exports = router;