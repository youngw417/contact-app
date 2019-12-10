const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
    // Get token from header

    const token = req.headers['x-auth-token'];
    // or we can use req.header('x-auth-token') this is header function
    
    // check if not token
    if (!token) {
       
        return res.status(401).json({msg: 'No token, aurhorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'token is not valid'});
    }
}