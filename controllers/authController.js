const { hashPassword, comparePass } = require("../helpers/authHelper");
const userModel = require("../modals/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });

    //existing users
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user, //from save
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messge: "Error in Registration",
      error,
    });
  }
  res.send("Registration logic goes here");
};

//POST LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        sucess: false,
        message: "Please provide an email and a password.",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePass(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //Token create
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
