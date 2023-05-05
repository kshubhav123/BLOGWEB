const Comment = require("../model/comment")



exports.create = async (req, res) => {

    try {
        const { text, email, blogId } = req.body;
        const comment = await Comment({ text, email, blogBy:blogId }).save();
        res.json(comment);
    }
    catch (e) {
        console.log(e);
    }
}



exports.list = async (req, res) => {
    try {
        const blogId=req.headers['blogid'];
        console.log("klkkkk",blogId);
        const comment = await Comment.find({blogBy:blogId})
        .populate('blogBy','_id title')
        .exec();
        res.json(comment);
    }
    catch (e) {
        console.log(e);
    }
}



