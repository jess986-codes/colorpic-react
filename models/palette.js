const mongoose = require("mongoose");

const paletteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  colors: [
    {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Palette", paletteSchema);
