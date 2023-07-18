const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { ForbiddenError, NotFoundError } = require("../errors");
const { Note } = require("../models");

const getNote = async (id) => {
  const note = await Note.findByPk(parseInt(id, 10));
  if (!note) {
    throw new NotFoundError("Note not found");
  }
  return note;
};

const authorizeModification = (session, note) => {
  if (parseInt(session.userId, 10) !== note.UserId) {
    throw new ForbiddenError("You are not authorized to delete this note");
  }
};

const handleErrors = (err, res) => {
  console.error(err);
  if (err.name === "SequelizeValidationError") {
    return res
      .status(422)
      .json({ errors: err.errors.map((e) => e.message).join(", ") });
  }
  res.status(500).send({ errors: err.message });
};

// Get all the notes
router.get("/", authenticateUser, async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.jobId) {
      whereClause.JobApplicationId = req.query.jobId;
    }
    const allNotes = await req.user.getNotes({ where: whereClause });

    res.status(200).json(allNotes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Create a new note
router.post("/", authenticateUser, async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      UserId: req.session.userId,
    });

    res.status(201).json(newNote);
  } catch (err) {
    handleErrors(err, res);
  }
});

// Update a specific note
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const note = await getNote(req.params.id);
    await authorizeModification(req.session, note);
    const updatedNote = await note.update(req.body);
    res.status(200).json(updatedNote);
  } catch (err) {
    handleErrors(err, res);
  }
});

// Delete a specific note
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const note = await getNote(req.params.id);
    await authorizeModification(req.session, note);
    await note.destroy();
    res.status(200).send({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
