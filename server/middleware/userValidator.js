import isEmpty from 'lodash.isempty';
import validator from 'validator';

/**
 * @description - Checks if the length of the name is valid
 *
 * @param {string} nameString - name
 *
 * @returns {boolean}
 */
const isValidNameLength = (nameString) => {
  // Check for name length
  if (!validator.isLength(nameString, { min: 3, max: 30 })) {
    return false;
  }
  return true;
};

/**
 * @description - Checks if the length of the password is valid
 *
 * @param {string} passwordString - password
 *
 * @returns {boolean}
 */
const isValidPasswordLength = (passwordString) => {
  // Check for password length
  if (!validator.isLength(passwordString, { min: 6, max: 30 })) {
    return false;
  }
  return true;
};

/**
 * @description - Validates client input when signing up
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateSignup = (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    role,
  } = req.body;
  const error = {};

  if (!name) {
    error.name = 'Name is required';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Name is required';
  }

  if (name && !isValidNameLength(name)) {
    error.name = 'Name can only be from 3 to 30 characters';
  }

  if (!password) {
    error.password = 'Password is required';
  }

  if (!confirmPassword) {
    error.password = 'Please confirm your password';
  }

  if (validator.isEmpty(password) ||
    validator.isEmpty(confirmPassword) ||
    (confirmPassword.trim() !== password.trim())) {
    error.password = 'Passwords empty or do not match';
  }

  if (password && !isValidPasswordLength(password)) {
    error.password = 'Password can only be from 6 to 30 characters';
  }

  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = 'Email address is invalid or empty';
  }

  if (!role) {
    error.role = 'User role is required';
  }

  if (role && validator.isEmpty(role.trim())) {
    error.role = 'User role is required';
  }

  if (role && !validator.matches(role, /(customer|caterer)/)) {
    error.role = 'User role can either be customer or caterer';
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

/**
 * @description - Validates client input when signing in
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;
  const error = {};

  if (!password) {
    error.password = 'Password is required';
  }

  if (password && validator.isEmpty(password.trim())) {
    error.password = 'Password is required';
  }

  if (password && !isValidPasswordLength(password)) {
    error.password = 'Password can only be from 6 to 30 characters';
  }

  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = 'Please enter a valid email address';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};
