const { Schema, default: mongoose } = require("mongoose");

let organiseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    storage: {
        type: Array,
    }

})

module.exports = mongoose.model("Organise", organiseSchema)