const express = require("express");
// const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const stripe = require("stripe")(
  "sk_test_51Oxh8ISIBGCXukf2quOvdOjHMWSaXSLy8SMYA4A7EJBequ3uu9kn0JyYSn9BbVBZr0l2reJQ3Fx1tydfBKr3VCNX005LxmJT6x"
);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { products, customer } = req.body;
  console.log('Request Payload:', req.body);

  console.log('products', products);
  console.log('customer', customer);
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name:  product.name,
        images: [product.image]
      },
      unit_amount:  product.price * 100,
    },
    quantity: 2,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer: customer, 
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/fff",
  });

  res.json({ id: session.id });

});


module.exports = router;
