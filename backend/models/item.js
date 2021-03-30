const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  wowId: {
    type: Number,
    required: true,
  },
  bossId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "boss",
  },
});

module.exports = mongoose.model("Item", itemSchema);
