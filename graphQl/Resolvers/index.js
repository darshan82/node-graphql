const EventModel = require('../../models/events')
const UserModel = require('../.././models/users')
const BookingModel = require('../.././models/bookings')

const bcryptjs = require("bcryptjs")

let user = async userId => {
    let user = await UserModel.findById(userId)
    if (user)
        return { ...user._doc, _id: user.id, createdEvents: events(user._doc.createdEvents) }
    return null

}
const events = async (eventIds) => {
    let result = await EventModel.find({ _id: { $in: eventIds } })
    if (result)
        return result.map(val => {
            return { ...val._doc, _id: val.id, creator: user(val._doc.creator) }
        })
    return null
}

module.exports = {
    events: async () => {
        try {
            const results = await EventModel.find()
            let events = results.map(val => {
                return { ...val._doc, _id: val.id, date: new Date().toString(), creator: user(val._doc.creator) }
            })
            return events
        } catch (err) {
            throw err
        }
    },
    createBooking: async (args) => {
        try {
            let event = await EventModel.findOne({ _id: args.eventId });
            console.log("event", event)
            const booking = new BookingModel({
                user: "625fbe44c499be2436a2811f",
                event: event
            })
            let results = await booking.save()
            return {
                ...results._doc, _id: results._id,
                user: user(results._doc.user),
                event: event,
                createdAt: new Date(results._doc.createdAt).toString(),
                updatedAt: new Date(results._doc.updatedAt).toString()
            }
        }
        catch (err) {
            throw err
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await BookingModel.findById({ _id: args.booking }).populate("event")
            let event = { ...booking.event._doc, _id: booking.event.id, creator: user(booking._doc.user) }
            console.log(event)
            await BookingModel.deleteOne({ _id: args.booking })
            return event
        }
        catch (err) {
            throw err
        }
    },
    bookings: async (args) => {
        try {
            let booking = await BookingModel.find();
            if (booking)

                return booking.map(async val => {
                    let event = await EventModel.findOne({ _id: val._doc.event });

                    return {
                        ...val._doc,
                        _id: val._id,
                        user: user(val._doc.user),
                        event,
                        createdAt: new Date(val._doc.createdAt).toString(),
                        updatedAt: new Date(val._doc.updatedAt).toString()

                    }
                })
        }
        catch (err) {
            throw err
        }
    },
    createEvent: async (args) => {
        console.log(args)
        try {
            const { title, date, description, price } = args.eventInput;
            const events = new EventModel({
                title,
                date: new Date(),
                description,
                price: price,
                creator: "625fbe44c499be2436a2811f"
            })
            let newEvent
            let result = await events.save()
            newEvent = { ...result._doc, _id: result.id, creator: user(result._doc.creator) }
            let User = await UserModel.findById("625fbe44c499be2436a2811f")
            if (!User)
                throw new Error("User not found");
            User.createdEvents.push(result.id)
            await User.save()
            return newEvent
        }
        catch (err) {
            throw err
        }
    },
    createUser: async (args) => {
        const { email, password } = args.userInput;
        try {
            let user = await UserModel.findOne({ email: email })
            if (user) {
                throw new Error("User already exists")
            }
            let hashPassword = await bcryptjs.hash(password, 12)
            const newUser = new UserModel({
                email,
                password: hashPassword,
            })
            let result = await newUser.save()
            return { ...result._doc, password: null, id: result.id }
        }
        catch (err) { throw err }

    }
}