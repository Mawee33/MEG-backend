const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lingerieSchema = new Schema({
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
            "soutien-gorge",
            "culotte",
            "maillot de bain",
            "homewear",
            "pyjama"
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
        "50",
        "85B",
        "90B",
        "95B",
        "100B",
        "105B", 
        "85C",
        "90C",
        "95C",
        "100C",
        "105C", 
        "85D",
        "90D",
        "95D",
        "100D",
        "105D", 
        "85E",
        "90E",
        "95E",
        "100E",
        "105E", 
    ]
},
price: String,
quantity: String
});

const lingerieModel = mongoose.model("lingerie", lingerieSchema);

module.exports = lingerieModel;