const express=require("express");
const route=express.Router();

const {create,list,listbyUser,readBlog,remove}=require("../controller/blog");
const { userCurrent } = require("../middleware/requireAuth");

route.post("/add-blog",userCurrent,create )
route.get("/blog-list", list)
route.get("/read-blog/:id", readBlog)
route.get("/listbyUser",userCurrent,listbyUser);
route.delete("/removeBlog/:id",userCurrent,remove )


module.exports=route