const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      // type: {}, if we use textarea/multiple line for address we need object
      required: true,
    },
    answer:{
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("users", userSchema);
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
