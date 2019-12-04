const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vetementSchema = new Schema({
    image: {
        type: String,
        default:
          "https://s1.qwant.com/thumbr/0x0/3/c/47fe4a877a815796e4e74607d1d529b44437e34ba4882fdec70e94a8080d5c/noimage.gif?u=http%3A%2F%2Fmoorestown-mall.com%2Fnoimage.gif&q=0&b=1&p=0&a=1"
      },    
    name: String,
    description: String,
    type: {
        type: [String],
        enum: [
            "robe",
            "chemise",
            "tee-shirt",
            "pull",
            "jupe",
            "pantalon"
        ]
    },
color: String,
size: {
    type: [String],
    enum: [
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
        "50"
    ]
},
price: String,
quantity: String
});

const vetementModel = mongoose.model("vetement", vetementSchema);

module.exports = vetementModel;