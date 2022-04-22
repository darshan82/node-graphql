const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingsSchema = Schema({
    event: { type: Schema.Types.ObjectId, ref: "Events" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
},{ timestamps: true,updatedAt:true})

module.exports = mongoose.model("Bookings", bookingsSchema)