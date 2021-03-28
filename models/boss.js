const mongoose = require('mongoose')

const bossSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wowId: {
        type: Number,
        required: true
    },
    encounterId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'location'
    }
})

module.exports = mongoose.model('Boss', bossSchema)