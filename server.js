const express = require('express');
const mongoose = require('mongoose'); 
const config = require("./config/config.json");
const db = require("./config/database.json");

const { errors } = require('celebrate');

const server = express();
var url = `mongodb://${db.development.host}:${db.development.port}/${db.development.database}`

mongoose.connect(url);
mongoose.connection.on("error",(err)=>console.log(err));
mongoose.connection.on("open",()=>console.log("successfully connected with database"));

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(require("./routes/custmerRoutes"));
server.use(require("./routes/categoryRoutes"));
server.use(require("./routes/productRoutes"));
server.use(errors());

server.listen((port = config.port),()=>{
    console.log("connected with server");
})