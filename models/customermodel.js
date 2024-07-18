const mongoose = require("mongoose");

 const customerSchema = new mongoose.Schema({
   fname:{type:String,text:true},
   lastName:{type:String,text:true},
   dob:{type:String,text:true},
   gender:{type:String,text:true},
   Address:{type:String,text:true},
   email:{type:String,text:true},
   mobileNo:{type:Number,text:true},
   password: {type:String,text:true,required:true},
   Date:{type:Date,text:true},
   status:{type:Boolean,text:true},
   customer_image:{type:String,text:true},
 }) 
 module.exports = mongoose.model("customer",customerSchema);