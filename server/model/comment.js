const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    blogBy: { 
            
        type: ObjectId,
        ref: 'Blog'
    },
}, { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema);