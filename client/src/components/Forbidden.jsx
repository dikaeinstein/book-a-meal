import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './util/Footer';

const Forbidden = () => (
  <main>
    <div
      className="forbidden-overlay"
      style={{
        minHeight: 'calc(100vh - 145px)',
        padding: '1rem',
      }}
    >
      <h6
        className="text-center"
        style={{ paddingTop: '60vh' }}
      >
        Sorry, access to this page is denied.
        Either check the url or <NavLink to="/">go home</NavLink>
      </h6>
    </div>
    <Footer />
  </main>
);

export default Forbidden;
