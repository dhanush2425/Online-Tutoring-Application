const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                throw Error("invalid token");
            } else {
                console.log(decodedToken);
                res.status(201).json({ "message": "success" });
            }
        })
    } else {
        throw Error("Unauthenticated user");
        next();
    }
}

const validate = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                throw Error("invalid token");
            } else {
                res.status(201).json({ "id": decodedToken.id });
            }
        })
    } else {
        res.status(401);
    }
}

module.exports = { requireAuth, validate };