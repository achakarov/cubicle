const { Router } = require('express');
const router = Router();
const authService = require('../services/auhtService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const validator = require('validator');

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body; 4
    let isStrongPassword = validator.isStrongPassword(password);

    try {

        if (!isStrongPassword) {
            throw { message: "You should have a strong password" };
        }

        let user = await authService.register(req.body);
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error });
        return;
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