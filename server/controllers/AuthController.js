import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import redisClient from '../utils/redis';
import { decodeString, hashPasswd } from '../utils/auth';

require('dotenv').config();

const { JWT_SECRET } = process.env;
const error = 'Unauthorized';
const { User } = require('../models');

class AuthController {
  /**
   * It checks if the user is authorized, if so, it creates a token and stores it in redis
   * @param req - The request object.
   * @param res - the response object
   * @returns A token
   */
  static async getConnect(req, res) {
    const incomingHeader = req.header('Authorization');
    if (!incomingHeader) return res.status(401).json({ error });

    const splitData = incomingHeader.substring(6);
    const buff = decodeString(splitData);
    const [email, password] = buff.split(':');
    if (!email || !password) {
      return res.status(401).json({ error });
    }
    const hashedPassword = hashPasswd(password);
    const userToFind = { email, password: hashedPassword };
    const userFound = await User.findAll({ where: userToFind });

    if (userFound.length <= 0) return res.json({ error: 'Not Found' });
    const key = uuidv4();
    const token = `auth_${key}`;
    const { id } = userFound[0];
    await redisClient.set(token, id, 86400);
    return res.json({ token: key });
  }

  /**
   * It deletes the token from the redis database
   * @param req - The request object.
   * @param res - The response object.
   * @returns the status code 204, which means that the request
   * was successful, but there is no content
   * to return.
   */
  static async getDisconnect(req, res) {
    const key = req.header('X-Token');
    if (!key || key.length === 0) {
      return res.status(401).json({ error });
    }
    if (await redisClient.get(`auth_${key}`)) {
      await redisClient.del(`auth_${key}`);
      return res.status(204).end();
    }
    return res.status(401).json({ error });
  }

  /**
   * It takes an email and password from the request body, hashes
   * the password, and then checks if the   * user exists in the
   * database. If the user exists, it creates a token and sends
   * it back to the user
   * @param req - The request object.
   * @param res - The response object.
   * @returns A token
   */
  static async signUp(req, res) {
    const { email, password } = req.body;
    const { sign } = jwt;

    if (!email) return res.status(400).json({ err: 'Missing Email' });
    if (!password) return res.status(400).json({ err: 'Missing password' });

    try {
      const user = await User.findAll({ where: { email } });
      if (user.length === 0) {
        return res.status(401).json({ err: 'Not valid credentials' });
      }

      const hashedPassword = hashPasswd(password);

      const userToFind = { email, password: hashedPassword };
      const userFound = await User.findAll({ where: userToFind });
      if (userFound.length <= 0) {
        return res.status(401).json({ error: 'Not valid credentials' });
      }

      const { id } = userFound[0];
      const expiresIn = 86400;

      const token = sign({ id }, JWT_SECRET, { expiresIn });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(403).json({ error });
    }
  }
}

export default AuthController;
