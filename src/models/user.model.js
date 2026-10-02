//? schema

import mongoose from "mongoose";

//? new mongoose.Schema(definition ,options)
const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: [true, "user already exists"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

//* creating collection / model
const User = mongoose.model("user", userSchema);
export default User;
