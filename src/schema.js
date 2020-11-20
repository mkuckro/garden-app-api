const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar DateTime

    type JournalEntry {
        id: ID!
        content: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type JournalEntryFeed {
        journalEntries: [JournalEntry]!
        cursor: String!
        hasNextPage: Boolean!
    }

    type Query {
        journalEntry(id: ID!): JournalEntry!
        journalEntries: [JournalEntry!]!
        journalEntryFeed(cursor: String): JournalEntryFeed
    }

    type Mutation {
        newEntry(content: String!): JournalEntry!
        updateEntry(id: ID!, content: String!): JournalEntry!
        deleteEntry(id: ID!): Boolean!
    }
`;