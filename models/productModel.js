const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,text:true},
    price:{type:Number,text:true},
    category_id:{type:mongoose.Schema.Types.ObjectId,ref:"category_id"},
    Description:{type:String,text:true}
})

module.exports = mongoose.model("product",productSchema);