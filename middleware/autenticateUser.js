const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ "message": "User not logged in yet" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ "message": "Forbidden" });
        }
        console.log(user)
        req.user = user
        next();
    });
};

module.exports = authenticateUser;
