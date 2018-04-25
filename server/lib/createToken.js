import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { secret } = process.env;

const createToken = id => jwt.sign(
  { id },
  secret,
  { expiresIn: '1 day' },
);

export default createToken;
