const mongoose = require("mongoose");

const lootSchema = new mongoose.Schema(
  {
    buyer: {
      type: String,
    },
    price: {
      type: Number,
    },
    customName: {
      type: String,
    },
    wowId: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loot", lootSchema);
