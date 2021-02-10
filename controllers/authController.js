const { Router } = require('express');
const router = Router();
const authService = require('../services/auhtService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register',
    isGuest,
    async (req, res) => {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            return res.render('register', { message: 'Passwords do not match!' });
        }

        try {
            let user = await authService.register({ username, password });
            res.redirect('/auth/login');
        } catch (err) {
            let error = Object.keys(err?.errors).map(x => ({ message: err.errors[x].properties.message}))[0];
            res.render('register', { error });
        }
    });

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;
    try {
        let token = await authService.login({ username, password });
        res.cookie('USER_SESSION', token);
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        res.render('login', { error });
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie("USER_SESSION");
    res.redirect('/products');
});

module.exports = router;