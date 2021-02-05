const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

module.exports = {
    register,

}