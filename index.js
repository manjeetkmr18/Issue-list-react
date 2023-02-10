const express = require("express")
const { ApolloServer } = require('apollo-server-express');
require('./models/db')
const Issue = require('./models/issues')


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


async function addSingleIssue(_, { Status, Owner, Effort, Title }) {
    console.log(Status);
    let singleIssue = {
        Owner: Owner,
        Status: Status,
        Effort: Effort,
        Title: Title,
        Created: new Date(),
        Due: new Date(),
    }
    let cnt = await Issue.find().count();
    singleIssue.Id = cnt + 1;
    return await Issue.create(singleIssue);
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
