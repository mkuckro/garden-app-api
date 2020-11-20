const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

// ** SECURITY ** //
const helmet = require('helmet');
const cors = require('cors');

// ** DATA LIMITATIONS ** //
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

// configure dynamic port options
const port = process.env.PORT || 4000;

// ** DATA SETUP ** //
// import mongoose models
const models = require('./models');
// import GraphQL typeDefs
const typeDefs = require('./schema');
// import GraphQL resolvers
const resolvers = require('./resolvers');


// ** DATABASE SETUP ** //
const DB_HOST = process.env.DB_HOST;
const db = require('./db');
// connect to database
db.connect(DB_HOST)

// ** SERVER SETUP ** //
// create the app variable for express server
const app = express();
app.use(cors());
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

// create new apollo server
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: () => { 
        return { models };
    }
 });

// apply middleware and set path to /api
// connects Apollo server to Http framework of express middleware library
server.applyMiddleware({ app, path: '/api'});

app.listen({ port }, () => {
    console.log(`server listening at http://localhost:${port}${server.graphqlPath}`);
});