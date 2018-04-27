import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;
// const secret = 'dikababa1111111111111111111111';

const isLoggedIn = (req, res, next) => {
  const token = req.get('Authorization') ?
    req.get('Authorization').slice(7) : req.body.token;
  const error = {};

  if (!token) {
    error.token = 'No token provided';
    return res.status(401).json({ error });
  }

  try {
    const verifiedToken = jwt.verify(token, secret);
    req.userId = verifiedToken.id;
    return next();
  } catch (err) {
    error.message = 'Unauthorized';
    return res.status(401).json({ error });
  }
};

export default isLoggedIn;
