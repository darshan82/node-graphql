const BookingModel = require("../.././models/bookings");
const EventModel = require("../../models/events");
const {
  user,
  singleEvent,
  transformBooking,
  transformEvent,
} = require("./merge");

module.exports = {
  createBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("you must be authenticated");
      }
      let event = await EventModel.findOne({ _id: args.eventId });
      console.log("event", event);
      const booking = new BookingModel({
        user: req.userId,
        event: event,
      });
      let results = await booking.save();
      return transformBooking(results);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args) => {
    try {
      if (!req.isAuth) {
        throw new Error("you must be authenticated");
      }
      const booking = await BookingModel.findById({
        _id: args.booking,
      }).populate("event");
      let event = transformEvent(booking.event);
      console.log(event);
      await BookingModel.deleteOne({ _id: args.booking });
      return event;
    } catch (err) {
      throw err;
    }
  },
  bookings: async (args) => {
    try {
      let booking = await BookingModel.find();
      if (booking) return booking.map(async (val) => transformBooking(val));
    } catch (err) {
      throw err;
    }
  },
};
