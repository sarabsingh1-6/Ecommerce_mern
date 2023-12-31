const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongodb ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Connecting mongodb ${error}`);
  }
};

module.exports = connectDB;