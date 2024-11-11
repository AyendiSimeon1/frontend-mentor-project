const express = require('express');
const noteRouter = express.Router();
const {
    createNote,
    getNotes,
    getNoteById,
    deleteNote,
    updateNote,
    toggleArchivedStatus
  } = require('../controllers/note.controller');


noteRouter.post('/create-note', createNote);

noteRouter.get('/get-notes', getNotes);

noteRouter.get('/get-note-by-id', getNoteById);

noteRouter.delete('/delete-note', deleteNote);

noteRouter.put('/update-note', updateNote);

noteRouter.get('toggle-archive', toggleArchivedStatus);

module.exports = noteRouter;