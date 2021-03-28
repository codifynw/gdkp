const express = require('express')
const router = express.Router()
const UPPERCASE = require('../models/lowercase')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const lowercases = await UPPERCASE.find()
        res.json(lowercase)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET
router.get('/:id', getUPPERCASE, (req, res) => {
    res.json(res.lowercase)
})

// CREATE
router.post('/', async (req, res) => {
    const lowercase = new UPPERCASE ({
        name: req.body.name,
    })

    try {
        const newUPPERCASE = await lowercase.save()
        res.status(201).json(newUPPERCASE)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATE
router.patch('/:id', getUPPERCASE, async (req, res) => {
    if (req.body.name != null) {
        res.lowercase.name = req.body.name
    }
    try {
        const updatedUPPERCASE = await res.lowercase.save()
        res.json(updatedUPPERCASE)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE
router.delete('/:id', getUPPERCASE, async (req, res) => {
    try {
        await res.lowercase.remove()
        res.json({'message': 'Deleted UPPERCASE'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getUPPERCASE(req, res, next) {
    let lowercase

    try {
        lowercase = await UPPERCASE.findById(req.params.id)
        if (lowercase === null) {
            return res.status(404).json({ message: 'Cannot find lowercase' })
        }
    } catch (error) {
        console.log("ERROR ERROR")
        return res.status(500).json({message: error.message})
    }

    res.lowercase = lowercase
    next()
}

module.exports = router