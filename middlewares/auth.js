const jwt = require('jsonwebtoken');
const secret = 'megaSecret';

module.exports = function () {
    return (req, res, next) => {
        let token = req.cookies["USER_SESSION"];
        if (token) {
            let userId = jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.clearCookie("USER_SESSION");
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });
        }

        next();
    }
}