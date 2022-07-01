const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const billSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 11,
    },
     amount: {
      type: Number,
      required: true,  
    },
  },
  {
    timestamps: true,
  },
  {
    unique: false
  }
);

module.exports = mongoose.model("Bill", billSchema);