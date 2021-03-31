const express = require("express");
const router = express.Router();
const Raid = require("../models/raid");
const Boss = require("../models/boss");
const Loot = require("../models/loot");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const raids = await Raid.find();
    res.json(raids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET 1
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
  if (req.body.slug != null) {
    res.subscriber.slug = req.body.slug;
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

// GET BOSSES IN RAID
router.get("/:id/bosses", getRaid, getBosses, (req, res) => {
  res.json(res.bosses);
});

// GET BOSSES IN RAID
router.get("/:id/loot", getLoot, (req, res) => {
  res.json(res.loot);
});

async function getRaid(req, res, next) {
  let raid;
  console.log(req.params.id);
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

async function getBosses(req, res, next) {
  let bosses;
  let encounterId = res.raid.encounterId;
  try {
    bosses = await Boss.find({
      encounterId: encounterId,
    });

    if (bosses === null) {
      return res.status(404).json({ message: "Cannot find bosses" });
    }
  } catch (error) {
    console.log("ERROR ERROR");
    return res.status(500).json({ message: error.message });
  }

  console.log(bosses);
  res.bosses = bosses;
  next();
}

async function getLoot(req, res, next) {
  let loot;
  let raidId = req.params.id;
  try {
    loot = await Loot.find({
      raidId: raidId,
    });

    if (loot === null) {
      return res.status(404).json({ message: "Cannot find loot" });
    }
  } catch (error) {
    console.log("ERROR ERROR");
    return res.status(500).json({ message: error.message });
  }

  console.log(loot);
  res.loot = loot;
  next();
}

module.exports = router;
