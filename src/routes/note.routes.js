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

noteRouter.get('/get-note-by-id/:id', getNoteById);

noteRouter.delete('/delete-note/:id', deleteNote);

noteRouter.put('/update-note/:id', updateNote);

noteRouter.put('toggle-archive/:id', toggleArchivedStatus);

module.exports = noteRouter;