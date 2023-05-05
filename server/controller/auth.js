const User = require("../model/auth")
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'secret', { expiresIn: maxAge })
}

exports.create = async (req, res) => {
    let { name, email, mobile, password } = req.body;
    const emailUser = await User.findOne({ email }).exec();
    try {
        if (emailUser == null) {
            console.log(name, email, mobile, password);
            const user = await User.create({ name, email, mobile, password });
            return res.status(201).json({ user, msg: "User Created Successfully" });
        } else {
            throw new Error('Email Already Exist');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if (cmp) {
                const role=user.role;
                const token = createToken(user._id);
                res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 8 * 3600000) })
                res.cookie('role', role, { httpOnly: true, expires: new Date(Date.now() + 8 * 3600000) })
                return res.status(201).json({ token,role, user })
            } else {
                throw new Error('Password does not matched');
            }
        } else {
            throw new Error('Invalid Email');
        }
    } catch (e) {
        res.status(500).json({ e: e.message })
    }
}

exports.profile = (req, res) => {
    try {
        if (res.user) {
            let user = res.user
            res.json(user);
        } else {
            res.json({ error: "User Not Found. Please Login" })
        }
    } catch (e) {
        console.log("Profile Error",e);
        return res.status(400).send({e:e.msg});
    }
}

exports.logout = (req, res) => {
    res.cookie('token', '', { maxAge: 1 })
    res.cookie('role', '', { maxAge: 1 })
    return res.json("logout successfully");
}

exports.remove = (req, res) => {
    const _id = req.params.id
    console.log(_id);
    const user = User.findByIdAndDelete({ _id }).exec();
    return res.json(user);
}