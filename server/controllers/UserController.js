const jwt = require('jsonwebtoken');
const { hashPasswd } = require('../utils/auth');

const { JWT_SECRET } = process.env;
require('dotenv').config();

const { User, Module, Note } = require('../models');
const { createPermissions } = require('../utils/auth');

class UsersController {
  /**
   * It creates a new user in the database, and returns a JWT token
   * @param req - The request object.
   * @param res - the response object
   * @returns A token
   */
  static async postNew(req, res) {
    const { email, password } = req.body;
    const { sign } = jwt;

    if (!email) return res.status(400).json({ err: 'Missing Email' });
    if (!password) return res.status(400).json({ err: 'Missing password' });

    const hashedPassword = hashPasswd(password);

    const userFound = await User.findAll({ where: { email } });
    if (userFound.length > 0) return res.json({ err: 'Already exists' });
    const userToCreate = { email, password: hashedPassword };

    const userCreated = await User.create(userToCreate);

    const { id } = userCreated;

    const expiresIn = 86400;
    const token = sign({ id }, JWT_SECRET, { expiresIn });

    const modules = await Module.findAll();
    await createPermissions(id, modules);

    return res.json({ token });
  }

  /**
   * It's an asynchronous function that returns a JSON object of all the users in the database
   * @param req - The request object. This is an object that represents the HTTP request and has
   * properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param res - The response object.
   * @returns An array of all users in the database.
   */
  static async getAll(req, res) {
    const users = await User.findAll({
      include: [Module, Note],
    });
    return res.json({ users });
  }

  /**
   * This function is used to get a single user from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of objects.
   */
  static async getOne(req, res) {
    const { email } = req.params;
    const user = await User.findAll({
      where: { email },
      include: [Module, Note],
    });
    return res.json({ user });
  }
}
module.exports = UsersController;
