const slugify = require("slugify");
const productModel = require("../modals/productModel");
const fs = require("fs");
const categoryModel = require("../modals/categoryModel");
const braintree = require("braintree");
const orderModel = require("../modals/orderModel");
const dotenv = require('dotenv')

dotenv.config();

//payment gatway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_Merchant_ID,
  publicKey: process.env.BRAINTREE_Public_Key,
  privateKey: process.env.BRAINTREE_Private_Key,
});

//creating product
const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; //getting data from fields because we have image in the model
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size > 1000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then 1MB" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product created Successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

// getting all products
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    // populate  the category of each product with its name and other details without populate it will show the id only
    // excluding photo in this so that request size doesn't increase
    // limit set to get 12 products only
    // soreted based on created at
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messgae: "Error in getting products",
      error,
    });
  }
};

const getSinlgeProductController = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    // populate  the category of each product with its name and other details without populate it will show the id only

    res.status(200).send({
      success: true,
      messgae: "Single product fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

// get product photo
const productPhototController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product photo",
      error,
    });
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOneAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      status: true,
      messgae: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

//update product
const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; //getting data from fields because we have image in the model
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then 1MB" });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated Successfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

//filter
const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }; //$gte = greaterthan, $lte = lessthan
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in filtering product",
      error,
    });
  }
};

// for product pagination
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

// product list based on page pagination
const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({}) // find all that is why {}object
      .select("-photo") // deselect photo
      .skip((page - 1) * perPage) //  skip the records
      .limit(perPage) //perPage variable is using here from above
      .sort({ createdAt: -1 }); // sorting based on created at
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in per page",
      error,
    });
  }
};

//search product
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params; //getting keyword fron params
    const results = await productModel // finding the keyword in the product name and description
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } }, //"i" it means case insensitive
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search product API",
      error,
    });
  }
};

const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params; // getting productid and category id from params
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid }, // excluding the current product to show in the similar product section
      })
      .select("-photo") // excluding photo
      .limit(3) // set limit of 3 products
      .populate("category"); // populating based on the category
    res.status(200).send({
      success: false,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in realted product",
      error,
    });
  }
};

const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in getting category wise product",
      error,
    });
  }
};

//payment gatway api
//token
const braintreeTokenController = async (req, res) => {
  try {
    //gateway which is created on top
    //clientToken.generate braintree functions
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
const braintreePaymentController = async (req, res) => {
  try {
    //nonce is in the api nonce-from-the-client we renamed with nonce
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // braintree api code
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ Ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};
