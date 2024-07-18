const categoryController = require("../controllers/catagoryController")
// const categoryValidation = require("../validation/")

const express = require("express");

const router = express.Router();
router.post("/categoryCreate",categoryController.addCategory);
router.get('/categoryView',categoryController.viewCategory);
router.put('/upadateCategory',categoryController.categoryUpdate);
router.delete('/deleteCategory',categoryController.categoryDelete);

module.exports = router;