const productsController = require("../controllers/productController")
const productValidation = require("../validation/productValidate");
const express = require("express")

const router = express.Router();

router.post("/addProduct",productValidation.createProduct,productsController.productCreate);
router.get("/viewProduct",productsController.productView);
router.put("/updateProduct",productsController.productUpdate);
router.delete("/deleteProduct",productsController.productDelete);
router.get("/viewCatepro",productsController.viewproducts);

module.exports = router;