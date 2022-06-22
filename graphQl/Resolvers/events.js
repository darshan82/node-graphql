const { dateToString } = require("../../helpers/date");
const EventModel = require("../../models/events");
const UserModel = require("../.././models/users");
const { user, transformEvent } = require("./merge");
module.exports = {
  events: async () => {
    try {
      const results = await EventModel.find();
      let events = results.map((val) => {
        return transformEvent(val);
      });
      return events;
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("You must be authenticated");
    }
    try {
      const { title, date, description, price } = args.eventInput;
      const events = new EventModel({
        title,
        date: new Date(),
        description,
        price: price,
        creator: req.userId,
      });
      let newEvent;
      let result = await events.save();
      newEvent = transformEvent(result);
      let User = await UserModel.findById(req.userId);
      if (!User) throw new Error("User not found");
      User.createdEvents.push(result.id);
      await User.save();
      return newEvent;
    } catch (err) {
      throw err;
    }
  },
};
