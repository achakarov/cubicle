const { Router } = require('express');
const router = Router();
const authService = require('../services/auhtService');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');

});

router.post('/register', async (req, res) => {
    //    console.log(req.body);
    try {
        let user = await authService.register(req.body);
        res.redirect('/login');
    } catch (error) {
        res.render('register', { error });
        return;
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let token = await authService.login({ username, password });
        res.cookie('USER_SESSION', token);
    } catch (error) {
        console.log(error);
        res.render('login', { error });
    }
});

module.exports = router;