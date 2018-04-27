import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

// const secret = 'dikababa1111111111111111111111';

const createToken = (id) => {
  console.log(secret);
  return jwt.sign(
    { id },
    secret,
    { expiresIn: '1 day' },
  );
};

export default createToken;
