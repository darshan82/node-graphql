const DataLoader = require("dataloader");
const EventModel = require("../../models/events");
const UserModel = require("../.././models/users");

let user = async (userId) => {
  let user = await userLoader.load(userId.toString());
  if (user)
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: eventsLoader.loadMany(user._doc.createdEvents),
    };
  return null;
};
const eventsLoader = new DataLoader((eventIds) => {
  events(eventIds);
});
const userLoader = new DataLoader((userIds) => {
  return UserModel.find({ _id: { $in: userIds } });
});
const events = async (eventIds) => {
  let result = await EventModel.find({ _id: { $in: eventIds } });
  if (result) {
    result.sort(
      (a, b) =>
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
    );
    return result.map((val) => {
      return transformEvent(val);
    });
  }
  return null;
};
const singleEvent = async (eventId) => {
  try {
    let result = await eventsLoader.load(eventId.toString());
    if (result) return result;
    return null;
  } catch (err) {
    throw err;
  }
};

const transformBooking = (results) => {
  return {
    ...results._doc,
    _id: results.id,
    user: userLoader.load(results._doc.user),
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
    date: val._doc.date,
  };
};

exports.transformEvent = transformEvent;

exports.transformBooking = transformBooking;

exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
