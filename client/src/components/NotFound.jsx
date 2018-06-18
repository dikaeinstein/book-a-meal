import React from 'react';
import Button from './util/Button';
import history from '../helpers/history';

const NotFound = () => {
  const handleClick = () => {
    history.goBack();
  };
  return (
    <div className="bg-light text-center not-found">
      <h1>404</h1>
      <h2>Sorry!</h2>
      <h2>Page not found :)</h2>
      <Button
        className="btn btn-notfound"
        onClick={handleClick}
        value="Go Back"
      />
    </div>
  );
};

export default NotFound;
