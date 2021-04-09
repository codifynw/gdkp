const express = require("express");
const router = express.Router();
const Loot = require("../models/loot");
const BlizzAPI = require('blizzapi');

const BnetApi = new BlizzAPI({
  region: 'us',
  clientId:  process.env.API_BATTLENET_KEY,
  clientSecret: process.env.API_BATTLENET_SECRET
});

// GET ALL
router.get("/", getAllLoot, getBlizzardData, async (req, res) => {
  console.log('lootItem.blizzData should be defined')
  res.json(res.loot);
});

// GET ALL WITHOUT BLIZZ DATA
// router.get("/", getAllLoot, async (req, res) => {
//   res.json(res.loot);
// });

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
    wowId: req.body.wowId,
    customName: req.body.customName,
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
  if (req.body.customName != null) {
    res.loot.customName = req.body.customName;
  }
  if (req.body.price != null) {
    res.loot.price = req.body.price;
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

// GET BLIZZARD DATA
async function getBlizzardData(req, res, next) {
  console.log('getBlizzardData')
  if (res.loot === null) {
    next()
  }

  await Promise.all(res.loot.map(async (lootItem) => {
    if (lootItem.wowId !== null) {
      lootItem.blizzData = await BnetApi.query(`/data/wow/item/${lootItem.wowId}?namespace=static-classic-us&locale=en_US`)
    }
  }));
  
  next()
}

async function getAllLoot(req, res, next) {
  let loots;

  try {
    loots = await Loot.find().lean();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.loot = loots;
  next()
}

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
