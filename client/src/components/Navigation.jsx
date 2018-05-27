import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ConnectedNavigation = ({ urls }) => {
  const urlList = urls.map(url => (
    <li key={url.id}>
      <a href={url.link}>{url.name}</a>
    </li>
  ));

  return (
    <nav className="col-3-4">
      <ul className="nav-container text-center">
        {urlList}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  urls: state.urls,
});

ConnectedNavigation.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Navigation = connect(mapStateToProps)(ConnectedNavigation);

export default Navigation;
