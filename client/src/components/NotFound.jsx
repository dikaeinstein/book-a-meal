import React from 'react';
import Button from './util/Button';
import history from '../helpers/history';
import Footer from './util/Footer';

const NotFound = () => {
  const handleClick = () => {
    history.goBack();
  };
  return (
    <main>
      <div
        className="bg-dark-light text-center not-found"
        style={{ minHeight: 'calc(100vh - 151px)' }}
      >
        <h1>404</h1>
        <h2>Sorry!</h2>
        <h2>Page not found :)</h2>
        <br />
        <br />
        <br />
        <Button
          className="btn btn-notfound"
          onClick={handleClick}
          value="Go Back"
        />
      </div>
      <Footer />
    </main>
  );
};

export default NotFound;
