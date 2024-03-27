const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSinlgeProductController,
  productPhototController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
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
router.delete("/delete-product/:pid", deleteProductController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filter", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController)

//similar product
router.get("/related-product/:pid/:cid", realtedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController)

//payment route
//token for verification for the braintree account 
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
module.exports = router;
