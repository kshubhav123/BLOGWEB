const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    
    title : {
        type: String,
        require: true,
    },
    description : {
        type: String,
        require: true,
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema);