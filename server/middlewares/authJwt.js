const { verify } = require('jsonwebtoken');

const { User } = require('../models');

require('dotenv').config();

const { JWT_SECRET } = process.env;

/**
 * It verifies the token sent in the request header and sets the userId in the request object
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that is called when the middleware is done.
 * @returns A function that takes in a request, response, and next.
 */
const verifyToken = async (req, res, next) => {
  const { headers } = req;
  if (headers.skip) return next();
  try {
    const token = headers['x-access-token'];
    console.log(token);
    if (!token) return res.status(403).json({ message: 'token required' });
    const verifiedToken = verify(token, JWT_SECRET);
    console.log({ verifiedToken });
    const { id } = verifiedToken;
    req.userId = id;
    const user = await User.findAll({ where: { id } });
    if (user.length === 0) {
      return res.status(404).json({ response: 'user not found' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return false;
};

module.exports = verifyToken;
