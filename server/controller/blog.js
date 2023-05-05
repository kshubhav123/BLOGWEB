const Blog = require("../model/blog")

exports.create = async (req, res) => {
    try {
        const { title, description } = req.body
        console.log("ffff", res.user._id);
        const blog = await Blog({ title, description, postedBy: res.user._id }).save();
        return res.json(blog);
    } catch (e) {
        console.log(e);
        return res.status(500).json(error);
    }
}

exports.list = async (req, res) => {
    try {
        const blog = await Blog.find({})
            .populate('postedBy', '_id name email')
            .exec();
        return res.json(blog);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.readBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        console.log(blogId);
        const blog =await Blog.findOne({_id:blogId}).exec();
        res.json(blog);
    } catch (error) {
        res.json(error)
        console.log("dfgdgdg",error);
    }
}

exports.listbyUser = async (req, res) => {
    try {
        if (res.user._id) {
            let user = res.user._id
            const blog = await Blog.find({ postedBy: user })
                .populate('postedBy', "_id name")
                .exec();
            res.json(blog);
        } else {
            res.json({ error: "User Not Found. Please Login" })
        }
    } catch (e) {
        console.log("Profile Error", e);
        return res.status(400).send({ e: e.msg });
    }
}


exports.remove=async (req,res)=>{
    let blogId=req.params.id
    console.log("ll",blogId);
    try {
        if (res.user._id) {
            const blog = await Blog.findByIdAndDelete({ _id:blogId }).exec();
            res.json(blog);
        } else {
            res.json({ error: "User Not Found. Please Login" })
        }
    } catch (e) {
        console.log("Profile Error", e);
        return res.status(400).send({ e: e.msg });
    }


}