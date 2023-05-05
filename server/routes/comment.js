const express=require("express");
const route=express.Router();

const {create,list}=require("../controller/comment");

route.post("/create-comment",create)
route.get("/comment-list", list)

module.exports=route