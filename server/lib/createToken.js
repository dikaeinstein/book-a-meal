import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

// const secret = 'dikababa1111111111111111111111';

const createToken = (id) => {
  console.log(SECRET);
  return jwt.sign(
    { id },
    SECRET,
    { expiresIn: '1 day' },
  );
};

export default createToken;
