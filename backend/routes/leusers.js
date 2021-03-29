const express = require('express')
const router = express.Router()
const Leuser = require('../models/leuser')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const leusers = await Leuser.find()
        res.json(leuser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET
router.get('/:id', getLeuser, (req, res) => {
    res.json(res.leuser)
})

// CREATE
router.post('/', async (req, res) => {
    const leuser = new Leuser ({
        name: req.body.username,
        password: req.body.password,
    })

    try {
        const newLeuser = await leuser.save()
        res.status(201).json(newLeuser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATE
router.patch('/:id', getLeuser, async (req, res) => {
    if (req.body.name != null) {
        res.leuser.name = req.body.name
    }
    try {
        const updatedLeuser = await res.leuser.save()
        res.json(updatedLeuser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE
router.delete('/:id', getLeuser, async (req, res) => {
    try {
        await res.leuser.remove()
        res.json({'message': 'Deleted Leuser'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getLeuser(req, res, next) {
    let leuser

    try {
        leuser = await Leuser.findById(req.params.id)
        if (leuser === null) {
            return res.status(404).json({ message: 'Cannot find leuser' })
        }
    } catch (error) {
        console.log("ERROR ERROR")
        return res.status(500).json({message: error.message})
    }

    res.leuser = leuser
    next()
}

module.exports = router
