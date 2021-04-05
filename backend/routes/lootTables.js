const express = require('express')
const router = express.Router()
const LootTable = require('../models/lootTable')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const lootTables = await LootTable.find()
        res.json(lootTables)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET
router.get('/:id', getLootTable, (req, res) => {
    res.json(res.lootTable)
})

// CREATE
router.post('/', async (req, res) => {
    const lootTable = new LootTable ({
        name: req.body.name,
    })

    try {
        const newLootTable = await lootTable.save()
        res.status(201).json(newLootTable)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATE
router.patch('/:id', getLootTable, async (req, res) => {
    if (req.body.name != null) {
        res.lootTable.name = req.body.name
    }
    try {
        const updatedLootTable = await res.lootTable.save()
        res.json(updatedLootTable)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE
router.delete('/:id', getLootTable, async (req, res) => {
    try {
        await res.lootTable.remove()
        res.json({'message': 'Deleted LootTable'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getLootTable(req, res, next) {
    let lootTable

    try {
        lootTable = await LootTable.findById(req.params.id)
        if (lootTable === null) {
            return res.status(404).json({ message: 'Cannot find lootTable' })
        }
    } catch (error) {
        console.log("ERROR ERROR")
        return res.status(500).json({message: error.message})
    }

    res.lootTable = lootTable
    next()
}

module.exports = router