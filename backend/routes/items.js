const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

// COMMENTING BELOW BEFORE DEMO
// CREATE
// router.post("/", async (req, res) => {
//   const item = new Item({
//     name: req.body.name,
//     wowId: req.body.wowId,
//     bossId: req.body.bossId,
//   });

//   try {
//     const newItem = await item.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // UPDATE
// router.patch("/:id", getItem, async (req, res) => {
//   if (req.body.name != null) {
//     res.item.name = req.body.name;
//   }
//   try {
//     const updatedItem = await res.item.save();
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // DELETE
// router.delete("/:id", getItem, async (req, res) => {
//   try {
//     await res.item.remove();
//     res.json({ message: "Deleted Item" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

async function getItem(req, res, next) {
  let item;

  try {
    item = await Item.findById(req.params.id);
    if (item === null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (error) {
    console.log("ERROR ERROR");
    return res.status(500).json({ message: error.message });
  }

  res.item = item;
  next();
}

module.exports = router;
