const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    mobile: {
        type: Number,
        require: true,
        index: true
    },
    password: {
        type: String,
        minlength: [6, 'password mus be 6 digit']
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true }
)


userSchema.pre ('save', async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
})


module.exports = mongoose.model('User', userSchema);