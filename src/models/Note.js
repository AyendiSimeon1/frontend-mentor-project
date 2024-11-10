const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    lastEdited: {
        type: Date,
        default: Date.now
    },
    isArchived: {
        type : Boolean,
        default: false
    }
}, {
        timestamps: true
    
});

noteSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;