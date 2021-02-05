const User = require('../models/User');

const register = async (userData) => {
    if (userData.password !== userData.repeatPassword) {
        throw { message: 'Passwords not matching' }
    }

    const user = new User(userData);

}

module.exports = {
    register,

}