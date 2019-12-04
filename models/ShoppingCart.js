const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema({
image: {
    type: Schema.Types.ObjectId,
    ref: "Vetement"
},
name : {
    type: Schema.Types.ObjectId,
    ref: "Vetement"
},
price: {
        type: Schema.Types.ObjectId,
        ref: "Vetement"
},
color: {
    type: Schema.Types.ObjectId,
    ref: "Vetement"
},
quantity: {
    type: Schema.Types.ObjectId,
    ref: "Vetement"
}
})

const shoppingCartModel = mongoose.model("shoppingCart", shoppingCartSchema);
module.exports = shoppingCartModel;