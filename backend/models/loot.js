const mongoose = require("mongoose");

const lootSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    buyer: {
      type: String,
    },
    price: {
      type: Number,
    },
    wowId: {
      type: Number
    },
    raidId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "raid",
    },
    bossId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "boss",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loot", lootSchema);
