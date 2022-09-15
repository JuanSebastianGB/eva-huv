const { User } = require('../models');
import { verify } from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    const { headers } = req;
    // const { SECRET } = config;
    const SECRET = 'SECRET';

    const token = headers['x-access-token'];

    if (!token) return res.status(403).json({ message: 'token required' });
    const verifiedToken = verify(token, SECRET);

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
