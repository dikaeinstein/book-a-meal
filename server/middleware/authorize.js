import users from '../test/usersTestData';

const authorize = (req, res, next) => {
  const { userId } = req;
  const error = {};
  const matchedUser = users.filter(user => (
    user.id === parseInt(userId, 10) && user.role === 'admin'
  ))[0];

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
