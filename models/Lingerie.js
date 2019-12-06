const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lingerieSchema = new Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dfnnpxhx9/image/upload/v1575543690/MEG/1280px-No_image_3x4.svg_bugbjl.png"
  },
  name: String,
  description: String,
  type: {
    type: [String],
    enum: ["soutien-gorge", "culotte", "maillot de bain", "homewear", "pyjama"]
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
      "105E"
    ]
  },
  price: Number,
  quantity: {
    type: [String],
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "50"]
  }
});

const lingerieModel = mongoose.model("lingerie", lingerieSchema);

module.exports = lingerieModel;
