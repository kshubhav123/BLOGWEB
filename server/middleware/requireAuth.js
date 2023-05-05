const jwt = require('jsonwebtoken')
const User = require("../model/auth")

const requireAuthToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (token) {
            jwt.verify(token, 'secret', (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    res.redirect("/login")
                    next();
                } else {
                    next();
                }
            })
        } else {
            throw new Error({ error: "Email Already Exist" });
        }
    } catch (e) {
        throw new Error(e)
    }
}

const userCurrent = (req, res, next) => {
    const token = req.headers['token'];
    if (token) {
        jwt.verify(token, "secret", async (err, decodedToken) => {
            if (err) {
                // console.log(err.message);
                res.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id)
                res.user = user
                next();
            }
        })
    } else {
        res.user = null;
        res.status(400).send({message: 'Token Not Found'});
        next();
    }
}


const adminMiddlewere = async (req, res, next) => {
    if (res.user.role == "admin") {
        next();
    } else {
        res.status(403).send();
    }
}

module.exports = { requireAuthToken, userCurrent, adminMiddlewere };