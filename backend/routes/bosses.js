const express = require("express");
const router = express.Router();
const Boss = require("../models/boss");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const bosses = await Boss.find();
    res.json(bosses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET 1
router.get("/:id", getBoss, (req, res) => {
  res.json(res.boss);
});

// GET ITEMS FROM 1
router.get("/:id/lootTable", getBoss, (req, res) => {
  // TODO
  console.log("GET LOOT FROM 1");
  console.log(res.boss);
  res.json(res.boss);
});

// CREATE
router.post("/", async (req, res) => {
  const boss = new Boss({
    name: req.body.name,
    wowId: req.body.wowId,
    image: req.body.image,
    encounterId: req.body.encounterId,
  });

  try {
    const newBoss = await boss.save();
    res.status(201).json(newBoss);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE
router.patch("/:id", getBoss, async (req, res) => {
  if (req.body.name != null) {
    res.boss.name = req.body.name;
  }
  try {
    const updatedBoss = await res.boss.save();
    res.json(updatedBoss);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getBoss, async (req, res) => {
  try {
    await res.boss.remove();
    res.json({ message: "Deleted Boss" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getBoss(req, res, next) {
  let boss;

  try {
    boss = await Boss.findById(req.params.id);
    if (boss === null) {
      return res.status(404).json({ message: "Cannot find boss" });
    }
  } catch (error) {
    console.log("ERROR ERROR");
    return res.status(500).json({ message: error.message });
  }

  res.boss = boss;
  next();
}

module.exports = router;
