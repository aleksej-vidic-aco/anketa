const mongoose = require("mongoose");

const Anketa = new mongoose.Schema({
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Anketa", Anketa)