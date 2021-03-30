const mongoose = require("mongoose");

const lootSchema = new mongoose.Schema(
  {
    buyer: {
      type: String,
    },
    price: {
      type: Number,
    },
    raidId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "raid",
    },
    bossId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "boss",
    },
    itemId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "item",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loot", lootSchema);
