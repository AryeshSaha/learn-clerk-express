const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  fullName: String,
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: String,
  passwordEnabled: {
    type: Boolean,
    required: true,
  },
  provider: String,
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
