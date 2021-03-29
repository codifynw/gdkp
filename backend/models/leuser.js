const mongoose = require('mongoose')

const leuserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Leuser', leuserSchema)
