const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'megaSecret';

const register = async ({ username, password }) => {
    const user = new User({ username, password });
    return await user.save();
}

const login = async ({ username, password }) => {
    //get user from db
    let user = await User.findOne({ username });

    if (!user) {
        throw { message: 'User not found' };
    }

    //compare password & hash
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { message: 'Password is incorrect' };
    }

    //generate token
    let token = jwt.sign({ _id: user._id, username: user.username }, secret);
    return token;
}

module.exports = {
    register,
    login
}