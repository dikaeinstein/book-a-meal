import React from 'react';
import PropTypes from 'prop-types';
import transformError from '../../helpers/transformError';

/**
 * A reusable error handler HOC
 *
 * @param {JSX} WrappedComponent React component
 * @param {String} defaultMessage Default fallback error message
 * @param {Function} onRetry Retry handler
 * @param {Boolean} retry True or False
 *
 * @returns {JSX} React component with error handling capability
 */
const errorHandler = (WrappedComponent, defaultMessage, onRetry = null, retry = false) => {
  const ErrorWrapper = ({ error, ...rest }) => {
    if (error) {
      return (
        <div className="error-container text-center">
          <h2>
            {transformError(error, defaultMessage)}
          </h2>
          {retry
            ?
              <button
                className="btn btn-default"
                onClick={onRetry}
                style={{ margin: '1rem auto 0 auto' }}
              >
                Retry
              </button>
            : null}
        </div>
      );
    }

    return <WrappedComponent {...rest} />;
  };

  ErrorWrapper.propTypes = {
    /* eslint react/require-default-props: 0 */
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string),
    ]),
  };

  return ErrorWrapper;
};

export default errorHandler;
