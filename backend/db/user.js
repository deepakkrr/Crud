const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const product=mongoose.model("users",userSchema);
module.exports=product;