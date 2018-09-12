import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

const Error = () => (
  <main>
    <div
      style={{
        minHeight: 'calc(100vh - 145px)',
        padding: '1rem',
      }}
      className="text-center"
    >
      <h1 style={{ margin: '5rem auto 3rem auto' }}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '7rem', color: '#eb480b' }} />
      </h1>
      <h3 style={{ margin: '3rem auto' }}>
        Oops! Something went wrong. We are working on it.
      </h3>
      <h6
        style={{ margin: '2rem' }}
      >
        <NavLink to="/">
          <i className="fas fa-home" />{' '}Go Home
        </NavLink>
      </h6>
    </div>
    <Footer />
  </main>
);

export default Error;
