const express = require("express");
const router = express.Router();
const Raid = require("../models/raid");
const Boss = require("../models/boss");
const Loot = require("../models/loot");
const mongoose = require("mongoose");

// GET ALL
router.get("/", async (req, res) => {
  console.log('hey')
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

// GET LOOT BY BOSS
router.get("/:id/loot/:bossId", getLoot, (req, res) => {
  let bossId = req.params.bossId;
  res.loot = res.loot.filter(function (e) {
    return e.bossId == bossId;
  });
  res.json(res.loot);
});

// GET LOOT IN RAID
router.get("/:id/loot", getLoot, (req, res) => {
  res.json(res.loot);
});

// GET GOLD IN RAID
router.get("/:id/gold", getLoot, (req, res) => {
  Loot.aggregate(
    [
      { $match: { raidId: new mongoose.Types.ObjectId(req.params.id) } },      
      {
        $group: {
          _id: "$raidId",
          total: {
            $sum: "$price"
          }
        }
      }
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );

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

  res.loot = loot;
  next();
}

module.exports = router;
