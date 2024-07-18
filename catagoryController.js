const category = require("../models/categoryModel");
const lib = require("../lib/responseManage");
const helpers = require("../helpers/meassages.json");

//insert or create API
module.exports.addCategory = async(req,res)=>{
    try {
        const add = await category.create(req.body);
        await add.save();
        if (add) {
            lib.sendResponse(res,200,helpers.category_add_success,req.body)
        } else {
            throw '---'
        }
    } catch (error) {
        lib.sendResponse(res,400,helpers.category_cannot_add,req.body)
    }
}

//view or read API of category

module.exports.viewCategory= async (req, res) => {
    try {
      const viewCategory = await category.find();
      if (viewCategory) {
        lib.sendResponse(
          res,
          200,
          helpers.category_view_success,
          viewCategory
        );
      } else {
        throw "---";
      }
    } catch {
        lib.sendResponse(
        res,
        500,
        helpers.ategory_view_fail,viewCategory
      );
    }
  };

  //update API

  module.exports.categoryUpdate = async(req,res)=>{
    try {
        const findCategory = await category.findOne({_id: req.query._id})
        if (findCategory) {
            await category.updateOne({_id:req.query._id},req.body);
            lib.sendResponse(res,200,helpers.category_update_success)
        } else {
            throw '---'          
        }
    } catch (error) {
        lib.sendResponse(res,400,helpers.something_went_wrong)                   
    }
}

//delete API

module.exports.categoryDelete = async(req,res)=>{
    try {
        const fonundCategory  = await category.findOne({_id:req.query._id});
        if (fonundCategory) {
            const categoryDelete = await category.deleteOne({_id:req.query._id});
            responseManage.sendResponse(res,200,helpers.category_deleted_success,categoryDelete)
        } else {
            throw '---'
        }
    } catch (error) {
        responseManage.sendResponse(res,404,helpers.category_deleted_fail);
    }
}