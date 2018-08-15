/**
 * @module authorizeSuperAdmin
 */
import { User } from '../models';

/**
 * @description - Checks if user is super admin
 * @async
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
const authorizeSuperAdmin = async (req, res, next) => {
  const { userId } = req;
  const error = {};
  const matchedUser = await User.findOne({
    where: { id: userId, role: 'superAdmin' },
  });

  if (!matchedUser) {
    error.message = "Forbidden, you don't have the privilege to perform this operation";
    return res.status(403).json({
      message: error.message,
      status: 'error',
      error,
    });
  }
  return next();
};

export default authorizeSuperAdmin;
