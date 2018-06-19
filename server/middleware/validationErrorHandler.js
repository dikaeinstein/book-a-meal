import { validationResult } from 'express-validator/check';

const validationErrorHandler = (req, res, next) => {
  const error = validationResult(req)
    .formatWith(({ msg }) => `${msg}`);

  if (error.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error: error.mapped(),
  });
};

export default validationErrorHandler;
