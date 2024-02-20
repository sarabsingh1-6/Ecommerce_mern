const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

// Config env
dotenv.config();

// Database
connectDB();

// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)

// Rest API route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to my MERN Ecommerce app",
  });
});

// Port
const PORT = process.env.PORT || 8080;

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
