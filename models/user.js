import { Schema, mongoose, ObjectId } from "mongoose";

import isEmail from "validator/lib/isEmail.js";
const User = mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      require: true, // NOT NUll
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      type: String,
      require: true, // NOT NUll
      validate: {
        validator: (value) => isEmail,
        message: "Username must be at least 3 characters",
      },
    },
    password: {
      // hashed/encrypted password
      type: String,
      require: true, // NOT NUll
      // validate
    },
    phone_number: {
      // hashed/encrypted password
      type: String,
      require: true, // NOT NUll
      // validate
    },
    address: {
      // hashed/encrypted password
      type: String,
      require: false, // NOT NUll
      // validate
    },
  })
);
export default User;
