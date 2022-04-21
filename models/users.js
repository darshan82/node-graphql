const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventsSchema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdEvents: [{ type: Schema.Types.ObjectId, ref: "Events" }],

})

module.exports = mongoose.model("User", eventsSchema)