const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    default: "anomym"
  },
  address: {
    street: String,
    zipCode: Number,
    city: String
  },
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  favorites: {
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: ["Vetement", "Lingerie"]
      }
    ],
  }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
