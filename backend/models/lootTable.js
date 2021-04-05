const mongoose = require('mongoose')

const lootTableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wowId: {
        type: Number,
        required: true
    },
    bossId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'boss'
    }
})

module.exports = mongoose.model('LootTable', lootTableSchema)