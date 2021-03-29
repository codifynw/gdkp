const mongoose = require('mongoose')

const raidSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date
    },
    encounterId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'location'
    },
    leader: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'leuser'
    }
})

module.exports = mongoose.model('Raid', raidSchema)
