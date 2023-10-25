const express = require("express");
const { createproduct, fetchAllProduct } = require("../controller/productController");
const router  = express.Router();

router.post('/',createproduct).get('/', fetchAllProduct);


exports.router = router;
