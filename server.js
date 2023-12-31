const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoute')
// Config env
dotenv.config();

// Database
connectDB();

// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoutes);

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
