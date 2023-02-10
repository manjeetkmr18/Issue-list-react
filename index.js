const express = require("express")
const { ApolloServer } = require('apollo-server-express');
require('./models/db')
const Issue = require('./models/issues')


let greetMessage = "Hello From GraphQL";

const typeDefs = `
    type issue {
        Id: Int,
        Status: String,
        Owner: String,
        Effort: Int,
        Created: String,
        Due: String,
        Title: String
    }
    type Query {
        greet: String!
        issueList: [issue]!
    }
    type Mutation {  
      addSingleIssue(Status: String!, Effort: Int!, Title: String!, Owner: String!): issue
    }
`;
const resolvers = {
    Query: {
        issueList
    },
    Mutation: {
        addSingleIssue
    },
};

function setGreetMessage(_, { message }) {
    return greetMessage = message;
}


function addSingleIssue(_, { Status, Owner, Effort, Title }) {
    let singleIssue = {
        Owner: Owner,
        Status: Status,
        Effort: Effort,
        Title: Title
    }
}

async function issueList() {
    return (await Issue.find());
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});



const app = express()
app.use(express.static('./public'))


server.start()
    .then(function () {
        server.applyMiddleware({ app, path: '/graphql', cors: true })
    })

app.listen('3000', function() {
    console.log("Webserver running...")
})
