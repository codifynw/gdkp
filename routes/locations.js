const express = require('express')
const router = express.Router()
const Location = require('../models/location')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find()
        res.json(locations)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET
router.get('/:id', getLocation, (req, res) => {
    res.json(res.location)
})

// CREATE
router.post('/', async (req, res) => {
    const location = new Location ({
        name: req.body.name,
    })

    try {
        const newLocation = await location.save()
        res.status(201).json(newLocation)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATE
router.patch('/:id', getLocation, async (req, res) => {
    if (req.body.name != null) {
        res.location.name = req.body.name
    }
    try {
        const updatedLocation = await res.location.save()
        res.json(updatedLocation)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE
router.delete('/:id', getLocation, async (req, res) => {
    try {
        await res.location.remove()
        res.json({'message': 'Deleted Location'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getLocation(req, res, next) {
    let location

    try {
        location = await Location.findById(req.params.id)
        if (location === null) {
            return res.status(404).json({ message: 'Cannot find location' })
        }
    } catch (error) {
        console.log("ERROR ERROR")
        return res.status(500).json({message: error.message})
    }

    res.location = location
    next()
}

module.exports = router