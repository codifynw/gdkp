const express = require('express')
const router = express.Router()

// GET ALL
router.get('/', (req, res) => {
    res.send('Hello Worlddd')
})

// GET
router.get('/:id', (req, res) => {
    // req.params.id
    res.send(req.params.id)
})

// CREATE
router.post('/', (req, res) => {

})

// UPDATE
router.patch('/:id', (req, res) => {

})

// DELETE
router.delete('/:id', (req, res) => {

})

module.exports = router