const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type Booking{
    _id : ID!
    event:Event!
    user:User!
}
type Event {
    _id : ID!
    title:String!
    description :String!
    price :Float!
    date :String!
    creator:User!

}
type User {
    _id : ID!
    email:String!
    password :String
    createdEvents:[Event!]
}
input UserInput {
    email:String!
    password :String!
}
type RootQuery { 
 events:[Event!]!
 bookings:[Booking!]!
}
input EventInput {
    title:String!
    description :String!
    price :Float!
    date :String!
}
type RootMutation {
     createEvent(eventInput:EventInput!) : Event
     createUser(userInput:UserInput!) : User
     createBooking(eventId:ID!):Booking
     cancelBooking(booking:ID!):Event
}
schema {
    mutation:RootMutation
    query:RootQuery
}
`)