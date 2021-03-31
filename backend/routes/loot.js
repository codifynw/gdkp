const express = require("express");
const router = express.Router();
const Loot = require("../models/loot");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const loots = await Loot.find();
    res.json(loots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
router.get("/:id", getLoot, (req, res) => {
  res.json(res.loot);
});

// CREATE
router.post("/", async (req, res) => {
  const loot = new Loot({
    buyer: req.body.buyer,
    price: req.body.price,
    raidId: req.body.raidId,
    bossId: req.body.bossId,
    itemId: req.body.itemId,
  });

  try {
    const newLoot = await loot.save();
    res.status(201).json(newLoot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE
router.patch("/:id", getLoot, async (req, res) => {
  if (req.body.name != null) {
    res.loot.name = req.body.name;
  }
  if (req.body.bossId != null) {
    res.loot.bossId = req.body.bossId;
  }
  try {
    const updatedLoot = await res.loot.save();
    res.json(updatedLoot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getLoot, async (req, res) => {
  try {
    await res.loot.remove();
    res.json({ message: "Deleted Loot" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getLoot(req, res, next) {
  let loot;

  try {
    loot = await Loot.findById(req.params.id);
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
