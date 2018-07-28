// import isEmpty from 'lodash.isempty';
// import validator from 'validator';
import { body } from 'express-validator/check';


/**
 * Validate user email
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const emailValidator = () =>
  body('email')
    .exists().withMessage('Email is required')
    .trim()
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email address is invalid or empty');


/**
 * Validate user name
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const nameValidator = () =>
  body('name')
    .exists().withMessage('Name is required')
    .trim()
    .not().isEmpty().withMessage('Name is required')
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage('Name can only be from 3 to 30 characters')
    .not().isNumeric()
    .withMessage('Please enter a valid name');


/**
 * Validate user password
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const passwordValidator = () =>
  /* eslint newline-per-chained-call: 0 */
  body('password')
    .exists().withMessage('Password is required')
    .trim()
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 30 })
    .withMessage('Password can only be from 6 to 30 characters');


/**
 * Validate password confirmation
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const confirmPasswordValidator = () =>
  body('confirmPassword')
    .exists().withMessage('Please confirm your password')
    .trim()
    .not().isEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value === req.body.password) return true;
      throw new Error('Passwords do not match');
    });


/**
 * Validate user role
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const roleValidator = () =>
  body('role')
    .exists().withMessage('User role is required')
    .trim()
    .not().isEmpty().withMessage('User role is required')
    .matches(/^(customer|caterer)$/)
    .withMessage('User role must be either customer or caterer');


/**
 * @description - Validate user input when signing up
 *
 * @returns {object}
 */
export const validateSignup = () => ([
  nameValidator(), emailValidator(),
  passwordValidator(), confirmPasswordValidator(),
  roleValidator(),
]);


/**
 * @description - Validate user input when signing in
 *
 * @returns {object}
 */
export const validateSignin = () => [
  emailValidator(), passwordValidator(),
];
