 const product = require("../models/productModel");
 const responseManage = require("../lib/responseManage");
 const helpers = require("../helpers/meassages.json");
const jwt  = require("jsonwebtoken");


 //insert or add product API
module.exports.productCreate = async(req,res)=>{
    try {
        const productadd = await product.create(req.body);
        await productadd.save();
        if (productadd) {
            responseManage.sendResponse(res,200,helpers.product_add_success,req.body)
        } else {
            responseManage.sendResponse(res,404,helpers.product_cannot_add,req.body)
        }
    } catch (error) {
        responseManage.sendResponse(res,404,helpers.product_cannot_add,req.body)
        
    }
};

//view or read product API
module.exports.productView = async(req,res)=>{
    try {
     const productView = await product.find();
     if (productView) {
        responseManage.sendResponse(res,200,helpers.product_view,productView)
        // console.log(productView);
     } else {
        responseManage.sendResponse(res,404,helpers.product_not_view,productView)
     } 
    } catch (error) {
        responseManage.sendResponse(res,500,helpers.product_seeing_error,productView)
    }
}

//update API product

module.exports.productUpdate = async(req,res)=>{
    try {
        const foundProduct = await product.findOne({_id:req.query._id})
        if (foundProduct) {
            await product.updateOne({_id:req.query._id},req.body);
            responseManage.sendResponse(res,200,helpers.product_update_success)
            // console.log("true",foundProduct);
        } else {
            throw '---'          
        }
    } catch (error) {
        responseManage.sendResponse(res,400,helpers.product_update_error)                   
    }
}

//delete API

module.exports.productDelete = async(req,res)=>{
    try {
        const findProduct  = await product.findOne({_id:req.query._id});
        if (findProduct) {
            const productDelete = await product.deleteOne({_id:req.query._id});
            responseManage.sendResponse(res,200,helpers.product_delete_success,productDelete)
        } else {
            throw '---'
        }
    } catch (error) {
        responseManage.sendResponse(res,404,helpers.product_notfound);
    }
}

//viewCategoryProduct
module.exports.viewproducts = async(req,res)=>{
    try {
        // console.log(req);
        const viewProduct = await product.find({category_id:req.query.category_id})
        // console.log(viewProduct);
        if(viewProduct){
            responseManage.sendResponse(res,200,helpers.product_view_success,viewProduct)
        }else {
            throw '---'
        }
    } catch (error) {
        responseManage.sendResponse(res,404,helpers.internal_server_error)
    }
}