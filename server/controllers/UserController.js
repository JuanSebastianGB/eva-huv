import crypto from 'crypto';

const { User } = require('../models');

/**
 * It takes a string, hashes it, and returns the hash
 * @param pwd - The password to be hashed.
 * @returns The hashed password.
 */
const hashPasswd = (pwd) => {
  const hash = crypto.createHash('sha1');
  const data = hash.update(pwd, 'utf-8');
  const genHash = data.digest('hex');
  return genHash;
};

class UsersController {
  /**
   * It creates a new user in the database if the email is not already taken
   * @param req - The request object.
   * @param res - the response object
   * @returns The userCreated object is being returned.
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ err: 'Missing Email' });
    if (!password) return res.status(400).json({ err: 'Missing password' });

    const hashedPassword = hashPasswd(password);

    const userFound = await User.findAll({ where: { email } });
    if (userFound.length > 0) return res.json({ err: 'Already exists' });
    const userToCreate = { email, password: hashedPassword };
    const userCreated = await User.create(userToCreate);
    return res.json({ userCreated });
  }

  /**
   * It's an asynchronous function that returns a JSON object of all the users in the database
   * @param req - The request object. This is an object that represents the HTTP request and has
   * properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param res - The response object.
   * @returns An array of all users in the database.
   */
  static async getAll(req, res) {
    const users = await User.findAll();
    return res.json({ users });
  }

  static async getOne(req, res) {
    const { email } = req.params;
    const user = await User.findAll({ where: { email } });
    return res.json({ user });
  }
}
export default UsersController;
