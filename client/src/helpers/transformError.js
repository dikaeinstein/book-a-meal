/**
 * Transform API error messages from object to string
 * @function
 * @export
 *
 * @param {object} error
 * @param {string} defaultMessage Default error message
 *
 * @returns {string} Error message
 */
const transformError = (error, defaultMessage) => (
  typeof error === 'object'
    ? defaultMessage
    : error
);

export default transformError;
