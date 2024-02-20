const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSinlgeProductController,
  productPhototController,
  deleteProductController,
  updateProductController,
} = require("../controllers/productController");
const formidable = require("express-formidable");

//router object
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSinlgeProductController);

// get product photo
router.get("/product-photo/:pid", productPhototController);

//delete product
router.delete("/product/:pid", deleteProductController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

module.exports = router;
