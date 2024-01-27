const JWT = require("jsonwebtoken");
const userModel = require("../modals/userModel");

//protected routes token base
const requireSignIn = async (req, res, next) => {
  try {
    //verify function to compare
    const decode = JWT.verify(
      //getting token from the header
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; // decode user so that we can get user id in below fun
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id); // finding user by id to check admin or not // req.user._id user we have passed in the login authcontrolller and _id in the DB
    if (user.role !== 1) {
      return res.status(401).send({
        sucess: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      sucess: false,
      error,
      messge: "Error in admin middleware",
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};
