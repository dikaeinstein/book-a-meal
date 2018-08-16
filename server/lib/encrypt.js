/**
 * @module - Export functions to hash password and checks password
 */
import bcrypt from 'bcrypt';

/**
 * @description - Hash user password
 * @async
 *
 * @param {string} password - Password string
 *
 * @returns {Promise<string>}
 */
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/**
 * @description - Check user password if it matches with password in database
 * @async
 *
 * @param {string} plaintextPassword - Plain password string
 * @param {string} hashpass - Hashed password from the database
 *
 * @returns {Promise<string>}
 */
export const checkPassword = async (plaintextPassword, hashPass) => {
  const match = await bcrypt.compare(plaintextPassword, hashPass);
  return match;
};
