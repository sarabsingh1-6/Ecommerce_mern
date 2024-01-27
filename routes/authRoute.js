const express = require("express");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
