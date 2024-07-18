const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    Name:{type:String,text:true}
})

module.exports = mongoose.model("category",categorySchema);