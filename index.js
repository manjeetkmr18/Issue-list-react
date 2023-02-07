const express = require("express")
const { ApolloServer } = require('apollo-server-express');
require('./models/db')
const Issue = require('./models/issues')

let greetMessage = "Hello From GraphQL";

const typeDefs = `
    type Query {
        greet: String!
        
    }
    type Mutation {
        setGreetMessage(message: String!): String        
    }
`;
const resolvers = {
    Query: {
        greet: () => greetMessage
    },
    Mutation: {
        setGreetMessage
    },
};

function setGreetMessage(_, { message }) {
    return greetMessage = message;
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function issueList() {
    return (await Issue.find());
}

const app = express()
app.use(express.static('./public'))


server.start()
    .then(function () {
        server.applyMiddleware({ app, path: '/graphql', cors: true })
    })

app.listen('3000', function() {
    console.log("Webserver running...")
})
