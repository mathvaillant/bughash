const jwt = require('jsonwebtoken');

// Generate JSON Web Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    })
}

module.exports = generateToken;