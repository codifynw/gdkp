const express = require("express");
const router = express.Router();
const Raid = require("../models/raid");
const Boss = require("../models/boss");
const Loot = require("../models/loot");
const mongoose = require("mongoose");
const BlizzAPI = require('blizzapi');

const BnetApi = new BlizzAPI({
  region: 'us',
  clientId:  process.env.API_BATTLENET_KEY,
  clientSecret: process.env.API_BATTLENET_SECRET
});

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

// BEFORE DEMO 
// CREATE
// router.post("/", async (req, res) => {
//   const raid = new Raid({
//     title: req.body.title,
//     time: req.body.time,
//     encounterId: req.body.encounterId,
//     leaderId: req.body.leaderId,
//   });

//   try {
//     const newRaid = await raid.save();
//     res.status(201).json(newRaid);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // UPDATE
// router.patch("/:id", getRaid, async (req, res) => {
//   if (req.body.slug != null) {
//     res.subscriber.slug = req.body.slug;
//   }
//   try {
//     const updatedRaid = await res.raid.save();
//     res.json(updatedRaid);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // DELETE
// router.delete("/:id", getRaid, async (req, res) => {
//   try {
//     await res.raid.remove();
//     res.json({ message: "Deleted Raid" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// GET BOSSES IN RAID
router.get("/:id/bosses", getRaid, getBosses, (req, res) => {
  res.json(res.bosses);
});

// GET LOOT BY BOSS
// router.get("/:id/loot/:bossId", getLoot, getBlizzardData, async (req, res) => {
router.get("/:id/loot/:bossId", getLoot, async (req, res) => {
  console.log('GET LOOT BY BOSS')
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


// GET LEADERS IN RAID
router.get("/:id/leaders", getLeaders, async (req, res) => {
  res.json(res.leaders);
});


async function getRaid(req, res, next) {
  let raid;
  try {
    raid = await Raid.findById(req.params.id);
    if (raid === null) {
      return res.status(404).json({ message: "Cannot find raid" });
    }
  } catch (error) {
    console.log("ERROR ERROR getRaid");
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
    console.log("ERROR ERROR getBosses");
    return res.status(500).json({ message: error.message });
  }

  res.bosses = bosses;
  next();
}

// GET ALL LOOT
async function getLoot(req, res, next) {
  let loot;
  let raidId = req.params.id;

  try {
    loot = await Loot.find({
      raidId: raidId,
    }).lean();

    if (loot === null) {
      return res.status(404).json({ message: "Cannot find loot" });
    }
  } catch (error) {
    console.log("ERROR ERROR getLoot");
    return res.status(500).json({ message: error.message });
  }

  res.loot = loot;
  next();
}


// GET LEADERS
async function getLeaders(req, res, next) {
  let leaders;
  let raidId = req.params.id;

  try {
    leaders = await Loot.aggregate(
      [
        { $match: { raidId: new mongoose.Types.ObjectId(req.params.id) } },
        {
          $group: {
            _id: "$buyer",
            total: {
              $sum: "$price"
            }
          },
        },
        { $sort: { total: -1 } },
        { "$limit": 5 },
        
          // Grouping pipeline
          // { $match: { raidId: new mongoose.Types.ObjectId(raidId) } },
          // { $group: { 
          //     "buyer": $buyer, 
          //     "spent": $price
          // }},
          // Optionally limit results
      ],
      
      function(err, result) {
        if (err) {
          console.log('error in getLeaders')
          res.send(err);
          console.log('error in getLeaders')
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    console.log("ERROR ERROR getLeaders");
    return res.status(500).json({ message: error.message });
  }

  res.leaders = leaders;
  next();
}

// GET BLIZZARD DATA FOR LOOT
// async function getBlizzardData(req, res, next) {
//   if (res.loot === null) {
//     next()
//   }

//   await Promise.all(res.loot.map(async (lootItem) => {
//     console.log('add blizzData')
//     lootItem.blizzData = {};
//     if (lootItem.wowId !== null) {
//       lootItem.blizzData = await BnetApi.query(`/data/wow/item/${lootItem.wowId}?namespace=static-classic-us&locale=en_US`)
//     }
//   }));
  
//   next()
// }


module.exports = router;
