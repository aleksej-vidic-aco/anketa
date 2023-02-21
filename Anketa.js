const mongoose = require("mongoose");

const Anketa = new mongoose.Schema({
    title: {
        type: String,
    },
    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Anketa", Anketa)