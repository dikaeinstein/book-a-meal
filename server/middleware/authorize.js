import { User } from '../models';

const authorize = async (req, res, next) => {
  const { userId } = req;
  const error = {};
  const matchedUser = await User.findOne({
    where: { id: userId, role: 'caterer' },
  });

  if (!matchedUser) {
    error.message = 'Forbidden';
    return res.status(403).json({
      message: error.message,
      status: 'error',
      error,
    });
  }
  return next();
};

export default authorize;
