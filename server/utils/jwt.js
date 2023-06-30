const jwt = require('jsonwebtoken');

function generateToken(user, exp = '2d') {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: exp })

}

function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send('Not authenticated');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next()
    })
}

module.exports = { generateToken, auth };