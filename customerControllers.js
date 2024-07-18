const customer = require("../models/customermodel");
const responseManage = require("../lib/responseManage");
const helpers = require("../helpers/meassages.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

//register API
module.exports.customerRegister = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const addData = {
      email: req.body.email,
      fname: req.body.fname,
      password: hashPassword,
    };

    const emailexists = await customer.findOne({ email: req.body.email });
    if (emailexists) {
      responseManage.sendResponse(res, 400, helpers.customer_email_exists);
    } else {
      const customerReg = await customer.create(addData);
      await customerReg.save();

      responseManage.sendResponse(
        res,
        200,
        helpers.customer_reg_success,
        customerReg
      );
    }
  } catch (error) {
    responseManage.sendResponse(
      res,
      500,
      helpers.internal_server_error,
      req.body
    );
  }
};

//login(API)
module.exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await customer.findOne({ email });
    // console.log("userrrr",user);
    if (!user) {
      responseManage.sendResponse(res, 404, helpers.customer_not_found);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    // console.log("validPassword",validPassword)
    if (!validPassword) {
      responseManage.sendResponse(res, 404, helpers.incorrect_password);
    } else {
      const token = await jwt.sign({ _id: user._id }, config.secretKey, {
        expiresIn: "10h",
      });
      // console.log("tokennnnn",token)
      responseManage.sendResponse(res, 200, helpers.customer_login_success, {
        user,
        token,
      });
    }
  } catch (error) {
    responseManage.sendResponse(res, 500, helpers.internal_server_error);
  }
};


//create API with emailexist(that was same email exists in database) and image of the customer also insert
module.exports.customerAdd = async (req, res) => {
  try {
    const emailexist = await customer.findOne({ email: req.body.email });
    if (emailexist) {
      responseManage.sendResponse(res, 400, helpers.customer_email_exists);
    } else {
      const filename = req.file.filename;
      const data = {
        fname: req.body.fname,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        mobileNo: req.body.mobileNo,
        Address: req.body.Address,
        email: req.body.email,
        password: req.body.password,
        customer_image: filename,
        status: req.body.status,
      };
      const add = await customer.create(data);
      await add.save();
      responseManage.sendResponse(res, 200, helpers.customer_add_success, add);
      console.log(add);
    }
  } catch {
    responseManage.sendResponse(
      res,
      500,
      helpers.custumer_add_failed,
      req.body
    );
  }
};

//read Api(customer)
module.exports.customerRead = async (req, res) => {
  try {
    const viewCustomer = await customer.find();
    if (viewCustomer) {
      responseManage.sendResponse(
        res,
        200,
        helpers.customer_view_success,
        viewCustomer
      );
    } else {
      throw "---";
    }
  } catch {
    responseManage.sendResponse(res, 500, helpers.internal_server_error);
  }
};

// customer api(update)

module.exports.customerUpdate = async (req, res) => {
  try {
    const findCustomer = await customer.findOne({ _id: req.query._id });
    // console.log(foundCustomer);
    if (findCustomer) {
      await customer.updateOne({ _id: req.query._id }, req.body);
      responseManage.sendResponse(
        res,
        200,
        helpers.customer_update_success,
        findCustomer
      );
    } else {
      throw "---";
    }
  } catch (error) {
    responseManage.sendResponse(res, 400, helpers.customer_update_fail);
  }
};

// //customer delete(api)
module.exports.customerDelete = async(req,res)=>{
  try {
      const foundedUser = await customer.findOne({_id:req.query._id});
      // console.log(foundedUser);
if(foundedUser){
  const cutmeruserDelete = await customer.deleteOne({_id:req.query._id});
  responseManage.sendResponse(
    res,200,helpers.customer_delete_success,cutmeruserDelete
  )
}else{
responseManage.sendResponse(
  res,
  404,
  helpers.customer_not_find
)
}
 } catch {
  responseManageme.sendResponse(res,500,helpers.something_went_wrong);
  }
}

// //search api

module.exports.customerSearch = async (req, res) => {
  const { fname, lastName, gender, email } = req.body;
  filter = {};

  if (fname) {
    filter.fname = { $regex: fname, $options: "i" };
  }
  if (lastName) {
    filter.lastName = lastName;
  }
  if (gender) {
    filter.gender = gender;
  }
  if (email) {
    filter.email = { $regex: email, $options: "i" };
  }
  try {
    const customerSearch = await customer.find(filter);
    responseManage.sendResponse(
      res,
      200,
      helpers.customer_search_success,
      customerSearch
    );
  } catch (error) {
    responseManage.sendResponse(res, 500, helpers.customer_search_fail);
  }
};
