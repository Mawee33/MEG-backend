const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
userName: String,
address: {
street: String,
zipCode: Number,
city: String
},
email: String,
password: String,
role: {
type: String,
default: "user"
}
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;