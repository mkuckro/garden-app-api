const { models } = require("mongoose")

module.exports = {
    journalEntry: async (parent, args, { models }) => {
        return await models.JournalEntry.findById(args.id);
    },
    
    journalEntries: async (parent, args, { models }) => {
        return await models.JournalEntry.find().limit(100);
    }, 

    journalEntryFeed: async (parent, { cursor }, { models }) => {
        // hardcode limit to 30 items
        const limit = 30;

        // set default hasNextPage value
        let hasNextPage = false;

        // set default cursor query to empty object and update to cursor if one exists
        let cursorQuery = {};
        if (cursor) {
            // selects documents where the id is less than the cursor
            cursorQuery = { _id: { $lt: cursor } }
        }

        // find limit + 1 of journal entries in the database
        let entries = await models.JournalEntry.find(cursorQuery).sort({ _id: -1 }).limit(limit + 1);

        if (entries.length > limit) {
            hasNextPage = true;
            entries = entries.slice(0, -1);
        }

        // set new cursor
        let newCursor = entries[length - 1]._id;

        return {
            entries,
            newCursor,
            hasNextPage
        };
    }
};