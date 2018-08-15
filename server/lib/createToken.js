/**
 * @module - Creates jwt token to authenticated user
 */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

/**
 * @description - Creates jwt token
 *
 * @param {number} id - User id used to sign token
 * @param {string} role - User role used to sign token
 *
 * @returns {string} - Token string
 */
const createToken = (id, role) => jwt.sign(
  { id, role },
  secret,
  { expiresIn: '1 day' },
);

export default createToken;
