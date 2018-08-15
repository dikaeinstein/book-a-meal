/**
 * @module authenticate
 */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

/**
 * @description - Checks if signed in user has valid token
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {null} - null
 */
const authenticate = (req, res, next) => {
  const token = req.get('Authorization') ?
    req.get('Authorization').slice(7) : req.body.token;
  const error = {};
  if (!token) {
    error.token = 'No token provided';
    return res.status(401).json({
      message: error.token,
      status: 'error',
      error,
    });
  }

  try {
    const verifiedToken = jwt.verify(token, secret);
    req.userId = verifiedToken.id;
    req.role = verifiedToken.role;
    return next();
  } catch (err) {
    error.message = 'Unauthorized, invalid token or session have expired';
    return res.status(401).json({
      status: 'error',
      message: error.message,
      error,
    });
  }
};

export default authenticate;
