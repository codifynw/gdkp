const mongoose = require("mongoose");
const nanoid = require("nanoid");

const raidSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
  },
  encounterId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "location",
  },
  leaderId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "leuser",
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(),
  }
});

module.exports = mongoose.model("Raid", raidSchema);
