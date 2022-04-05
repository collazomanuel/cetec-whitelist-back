import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
