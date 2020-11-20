module.exports = {
    newEntry: async (parent, args, { models }) => {
        // create new journal entry using the content argument passed during the newEntry mutation
        return await models.JournalEntry.create({ content: args.content});
    }, 

    updateEntry: async (parent, { content, id }, { models }) => {
        return await models.JournalEntry.findOneAndUpdate(
            {
                _id: id 
            },
            {
                // update content using mongodb field update operator
                $set: {
                    content
                }
            },
            {
                new: true

            }
        )
    },

    deleteEntry: async (parent, { id }, { models }) => {
        // find the entry by id
        const foundEntry = models.JournalEntry.findById(id);

        // try to delete the found entry. If deleted, return true. else return false
        try {
            await foundEntry.remove();
            return true;
        } catch (error) {
            return false;
        }
    }
};