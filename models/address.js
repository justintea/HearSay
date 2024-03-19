const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    addressStreet: {
      type: String,
      required: true,
    },
    addressAptUnitNum: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,    
  }
);

module.exports = model("Address", addressSchema);
