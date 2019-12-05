const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vetementSchema = new Schema({
image: {
        type: String,
        default:
          "https://res.cloudinary.com/dfnnpxhx9/image/upload/v1575543690/MEG/1280px-No_image_3x4.svg_bugbjl.png"
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
price: Number,
quantity: Number
});

const vetementModel = mongoose.model("vetement", vetementSchema);

module.exports = vetementModel;