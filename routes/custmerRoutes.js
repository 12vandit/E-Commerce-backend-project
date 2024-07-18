const customerControllers =  require("../controllers/customerControllers")
// const customerValidate = require("../validation/customerValidate");
const fileUpload = require("../middlewares/imageUpload");

const express = require("express");

const router = express.Router();
router.post("/registerCustomer",customerControllers.customerRegister);
router.post("/loginCustomer",customerControllers.loginCustomer);

router.post("/customerAdd",fileUpload.imageUpload.single("customer_image"),customerControllers.customerAdd);
router.get("/viewCustomer",customerControllers.customerRead)
router.put("/updateCustomer",customerControllers.customerUpdate)
router.delete("/customerDelete",customerControllers.customerDelete);
router.get("/customerSearch",customerControllers.customerSearch);


module.exports = router;
