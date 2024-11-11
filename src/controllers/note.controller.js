const Note = require('../models/Note');
const { validateId } = require('../validators/note.validator');


const createNote = async (req, res) => {

    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getNotes = async (req, res) => {
  try {
    const { tags, isArchived, search } = req.query;
    let query = {};

    if (tags){
        query.tags = { $in: Array.isArray(tags) ? tags: [tags] };
        
    }
    if (typeof isArchived === 'boolean') {
      query.isArchived = isArchived;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const notes = await Note
      .find(query) 
      .sort({ lastEdited: -1 });
    
    res.json(notes);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const getNoteById = async (req, res) => {
  try {
    // const { error } = validateId.validate({ id: req.params.id });
    // if(error) {
    //   return res.status(400).json({ error: error.message });
    // }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateNote = async(req, res) => {
  try {
  //   const { error } = validateId.validate({ id: req.query.params });
  // if (error) {
  //   res.status(400).json({ error: error.message });
  // }
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      lastEdited: new Date()

    }, {
      new: true, runValidators: true
    }
  );

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });

  }
  res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};

const deleteNote = async (req, res) => {

  try {
    // const { error } = validateId.validate({ id: req.params.id });
    // if(error) {
    //   return res.status(400).json({ error: error.message });
    // }
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note) {
      return res.status(404).json({ error: 'Note not found'});
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const toggleArchivedStatus = async (req, res) => {

  try {
    const { error } = validateId.validate({ id: req.params.id });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const note = await Note.findById(req.params.id);
    if(!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    note.isArchived = !note.isArchvied;
    note.lastEdited = new Date();
    await note.save();
    res.json(note);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  deleteNote,
  updateNote,
  toggleArchivedStatus
}