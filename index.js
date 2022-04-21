const express = require('express')
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require("express-graphql")
const mongoose = require('mongoose')
const EventModel = require('./models/events')
const UserModel = require('./models/users')
const bcryptjs = require("bcryptjs")
const app = express()

app.use(bodyParser.json())

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
app.use("/api", graphqlHTTP({
    schema: buildSchema(`
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
         
    }
    schema {
        mutation:RootMutation
        query:RootQuery
    }
    `),
    rootValue: {
        events: async () => {
            try {
                const results = await EventModel.find()
                let events = results.map(val => {
                    delete val._doc.__v
                    return { ...val._doc, _id: val.id, date: new Date().toString(), creator: user(val._doc.creator) }
                })
                console.log(events)
                return events
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        createEvent: (args) => {
            console.log(args)
            const { title, date, description, price } = args.eventInput;
            const events = new EventModel({
                title,
                date: new Date(),
                description,
                price: price,
                creator: "625fbe44c499be2436a2811f"
            })
            let newEvent
            events.save().then((result) => {
                // 625fbe44c499be2436a2811f
                newEvent = { ...result._doc }
                return UserModel.findById("625fbe44c499be2436a2811f").then((user) => {
                    if (!user)
                        throw new Error("User not found");

                    user.createdEvents.push(result.id)
                    return user.save()

                })
            }).then((result) => {
                return newEvent

            }).catch((err) => {
                console.error(err)
                throw err
            })
            return events
        },
        createUser: (args) => {
            const { email, password } = args.userInput;
            return UserModel.findOne({ email: email }).then(user => {
                if (user) {
                    throw new Error("User already exists")
                }
                return bcryptjs.hash(password, 12)
            })
                .then(hashPassword => {
                    const user = new UserModel({
                        email,
                        password: hashPassword,
                    })
                    return user.save()
                }).then(result => {
                    return { ...result._doc, password: null, id: result.id }
                })
                .catch(err => { throw err })

        }
    },
    graphiql: true


}))
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6anhc.mongodb.net/PRACTICE-NODEJS-GRAPHQL?retryWrites=true&w=majority`).then((res) => {
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