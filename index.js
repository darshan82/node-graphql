const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");
const Schema = require("./graphQl/Schema");
const Resolvers = require("./graphQl/Resolvers");
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  // Website you wish to allow to connect

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  // Pass to next layer of middleware
  next();
});
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    rootValue: Resolvers,
    graphiql: true,
    pretty: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6anhc.mongodb.net/PRACTICE-NODEJS-GRAPHQL?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("Database connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res, next) => {
  res.send("Server is running");
});
app.listen(3000, (res, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running");
  }
});
