const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET
router.get('/:id', (req, res) => {
    // req.params.id
    res.send(req.params.id)
})

// CREATE
router.post('/', async (req, res) => {
    const subscriber = new Subscriber ({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATE
router.patch('/:id', (req, res) => {

})

// DELETE
router.delete('/:id', (req, res) => {

})

module.exports = router