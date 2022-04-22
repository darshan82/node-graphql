const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require("express-graphql")
const mongoose = require('mongoose')

const Schema = require("./graphQl/Schema")
const Resolvers = require('./graphQl/Resolvers')
const app = express()

app.use(bodyParser.json())


app.use("/api", graphqlHTTP({
    schema: Schema,
    rootValue: Resolvers,
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