const transformError = (error, defaultMessage) => (
  typeof error === 'object'
    ? defaultMessage
    : error
);

export default transformError;
