const mongoose = require('mongoose');

// ** SCHEMA ** //
const journalEntrySchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// ** MODEL ** //
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// Export the journal entry model
module.exports = JournalEntry;