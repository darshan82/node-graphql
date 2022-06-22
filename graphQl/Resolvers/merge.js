const EventModel = require("../../models/events");
const UserModel = require("../.././models/users");

let user = async (userId) => {
  let user = await UserModel.findById(userId);
  if (user)
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events(user._doc.createdEvents),
    };
  return null;
};
const events = async (eventIds) => {
  let result = await EventModel.find({ _id: { $in: eventIds } });
  if (result)
    return result.map((val) => {
      return transformEvent(val);
    });
  return null;
};
const singleEvent = async (eventId) => {
  try {
    let result = await EventModel.findById(eventId);
    if (result) return transformEvent(result);
    return null;
  } catch (err) {
    throw err;
  }
};

const transformBooking = (results) => {
    return {
      ...results._doc,
      _id: results.id,
      user: user(results._doc.user),
      event: singleEvent(results._doc.event),
      createdAt: new Date(results._doc.createdAt).toString(),
      updatedAt: new Date(results._doc.updatedAt).toString(),
    };
  };

  const transformEvent = (val) => {
    return {
      ...val._doc,
      _id: val.id,
      creator: user(val._doc.creator),
      date: new Date(val._doc.date),
    };
  };

exports.transformEvent = transformEvent;

exports.transformBooking = transformBooking;
  
exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
