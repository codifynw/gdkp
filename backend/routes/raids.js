const express = require("express");
const router = express.Router();
const Raid = require("../models/raid");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const raids = await Raid.find();
    res.json(raids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
router.get("/:id", getRaid, (req, res) => {
  res.json(res.raid);
});

// CREATE
router.post("/", async (req, res) => {
  const raid = new Raid({
    title: req.body.title,
    time: req.body.time,
    encounterId: req.body.encounterId,
    leaderId: req.body.leaderId,
  });

  try {
    const newRaid = await raid.save();
    res.status(201).json(newRaid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE
router.patch("/:id", getRaid, async (req, res) => {
  if (req.body.name != null) {
    res.raid.name = req.body.name;
  }
  try {
    const updatedRaid = await res.raid.save();
    res.json(updatedRaid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getRaid, async (req, res) => {
  try {
    await res.raid.remove();
    res.json({ message: "Deleted Raid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRaid(req, res, next) {
  let raid;

  try {
    raid = await Raid.findById(req.params.id);
    if (raid === null) {
      return res.status(404).json({ message: "Cannot find raid" });
    }
  } catch (error) {
    console.log("ERROR ERROR");
    return res.status(500).json({ message: error.message });
  }

  res.raid = raid;
  next();
}

module.exports = router;
