const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = 'megaSecret';

const register = async (userData) => {
    if (userData.password !== userData.repeatPassword) {
        throw { message: 'Passwords not matching' }
    }
    try {
        //TODO: Check if user exists - .find

        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(userData.password, salt);

        const user = new User({ username: userData.username, password: hash });
        return user.save();
    } catch (error) {
        console.log(error);
    }
}

const login = async ({ username, password }) => {
    //get user from db
    let user = await User.findOne({ username });

    if (!user) {
        throw { message: 'User not found' };
    }

    //compare password & hash
    let isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
        throw { message: 'Password does not match' };
    }

    //generate token
    let token = jwt.sign({ _id: user._id, username: user.username }, secret);
    return token;
}

module.exports = {
    register,
    login
}