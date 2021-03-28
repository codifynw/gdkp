// ONY
// MC
// BWL
// ZG
// AQ20
// AQ40
// NAXX

const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Location', locationSchema)
