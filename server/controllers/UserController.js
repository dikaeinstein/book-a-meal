import { hashPassword, checkPassword } from '../lib/encrypt';
import createToken from '../lib/createToken';
import { User } from '../models';


/**
 * @class UserController
 *
 * @export
 *
 */
class UserController {
  /**
   * @description - Creates a new user
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof UserController
   *
   * @returns {Promise<object>}
   */
  static async createUser(req, res) {
    const error = {};
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const matchedUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    // Check if user already exist
    if (matchedUser) {
      error.email = 'Email already exists';
      return res.status(422).json({
        message: error.email,
        status: 'error',
        error,
      });
    }

    // Hash user password and initialize new user
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = createToken(newUser.id, newUser.role);
    return res.status(201)
      .header('Authorization', `Bearer ${token}`)
      .json({
        message: 'User successfully created',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
        status: 'success',
      });
  }

  /**
   * @description - Sign in a user
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof UserController
   *
   * @returns {Promise<object>}
   */
  static async signinUser(req, res) {
    const { email, password } = req.body;
    const error = {};
    const matchedUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!matchedUser) {
      error.email = 'User does not exist';
      return res.status(404).json({
        message: error.email,
        status: 'error',
        error,
      });
    }

    const match = await checkPassword(password, matchedUser.password);
    if (match) {
      // Create token for user
      const token = createToken(matchedUser.id, matchedUser.role);

      return res.status(200)
        .header('Authorization', `Bearer ${token}`)
        .json({
          message: 'User successfully signed in',
          user: {
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
          },
          token,
          status: 'success',
        });
    }
    error.password = 'You entered a wrong password';
    return res.status(401).json({
      message: error.password,
      status: 'error',
      error,
    });
  }

  /**
   * @description - Deletes a user account
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof - UserController
   *
   * @returns {Promise<object>}
   */
  static async deleteUserAccount(req, res) {
    const { userId } = req.params;
    const error = {};

    const matchedUser = await User.findById(userId);

    if (!matchedUser) {
      error.message = 'User not found';
      return res.status(404).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    await matchedUser.destroy();
    return res.status(200).json({
      message: 'User account deleted successfully',
      status: 'success',
    });
  }
}

export default UserController;
