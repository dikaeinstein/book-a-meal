import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// const { secret } = process.env;

const secret = 'dikababa1111111111111111111111';

const createToken = (id) => {
  return jwt.sign(
    { id },
    secret,
    { expiresIn: '1 day' },
  );
};

export default createToken;
