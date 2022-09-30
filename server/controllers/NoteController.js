const { Note } = require('../models');
const noteMethods = require('../services/notes');

class NoteController {
  /**
   * It creates a new note if the description doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { description } = req.body;
    if (!description) res.status(400).json({ err: 'missing description' });
    try {
      const note = await noteMethods.getByParam('description', description);
      if (note.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await noteMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the notes from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the notes in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await noteMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a note by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The description of the note with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await noteMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a note from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const note = await noteMethods.getById(id);
      if (note.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await noteMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a note by its id, updates it with the new data,
   * and returns the updated note
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async update(req, res) {
    let { id } = req.params;
    const { body } = req;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const note = await noteMethods.getById(id);
      if (note.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await noteMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of notes in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of notes in the database.
   */
  static async getCount(req, res) {
    const response = await Note.count();
    return res.status(200).json({ response });
  }
}

module.exports = NoteController;
