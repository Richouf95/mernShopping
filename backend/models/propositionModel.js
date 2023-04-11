const mongoose = require('mongoose')

const Schema = mongoose.Schema

const propositionSchema = new Schema({
    token: {
        type: Object
    },
    command: {
        type: Object
    },
    user_id: {
        type: String,
        required: true
    },
    totalProposition: {
        type: Number
    }
}, {timestamps: true})

module.exports = mongoose.model('Proposition', propositionSchema)