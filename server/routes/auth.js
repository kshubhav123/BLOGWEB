const express=require("express");
const { create,login,remove,logout,profile } = require("../controller/auth");
const {requireAuthToken,userCurrent,adminMiddlewere} = require("../middleware/requireAuth");
const route=express.Router();


route.get("/",(req,res)=>{
    res.send("hello");
} )

route.post("/create", create);
route.post("/login", login);
route.get("/logout",logout);
route.delete("/delete/:id",remove);
route.get("/profile",userCurrent, profile);

module.exports=route