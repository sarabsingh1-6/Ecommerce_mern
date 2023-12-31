const express = require("express");
const {registerController, loginController} = require('../controllers/authController');

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController)

module.exports = router;