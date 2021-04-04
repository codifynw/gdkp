const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  wowId: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Item", itemSchema);
