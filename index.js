const express = require('express')
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require("express-graphql")
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.json())

let EVENTS = []
app.use("/api", graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id : ID!
        title:String!
        description :String!
        price :Float!
        date :String!

    }
    type RootQuery { 
     events:[Event!]!
    }
    input EventInput {
        title:String!
        description :String!
        price :Float!
        date :String!
    }
    type RootMutation {
         createEvent(eventInput:EventInput!) : Event
    }
    schema {
        mutation:RootMutation
        query:RootQuery
    }
    `),
    rootValue: {
        events: () => { return EVENTS },
        createEvent: (args) => {
            console.log(args)
            const { title, date, description, price } = args.eventInput;
            const newEvent = {
                title,
                date: new Date().toISOString(),
                description,
                price: price,
                _id: Math.random().toString()

            }
            EVENTS.push(newEvent);
            return newEvent
        }
    },
    graphiql: true


}))
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6anhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then((res) => {
    console.log("Database connection successfully")
}).catch(err => {
    console.log(err)
})
app.get("/", (req, res, next) => {
    res.send("Server is running")
})
app.listen(3000, (res, err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("server is running")
    }
})