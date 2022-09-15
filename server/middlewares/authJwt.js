const { User } = require('../models');
import { verify } from 'jsonwebtoken';

require('dotenv').config();
const { JWT_SECRET } = process.env;

export const verifyToken = async (req, res, next) => {
  try {
    const { headers } = req;

    const token = headers['x-access-token'];

    if (!token) return res.status(403).json({ message: 'token required' });
    const verifiedToken = verify(token, JWT_SECRET);
    console.log({ JWT_SECRET });

    const { id } = verifiedToken;
    req.userId = id;

    const user = await User.findAll({ where: { id } });

    if (user.length === 0)
      return res.status(404).json({ response: 'user not found' });

    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
