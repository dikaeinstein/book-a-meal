import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-materialize';
import '../../static/sass/materialize.scss';

/**
 * displays a loading progress bar
 *
 * @param {Object} props object with property, text
 *
 * @returns {JSX} JSX element
 */
const Loading = ({ children, text }) => (
  <section style={{ margin: '0 auto', textAlign: 'center' }}>
    <Row>
      <Col s={12}>
        <strong style={{ display: 'block', marginBottom: '1rem' }}>
          {text}
        </strong>
        {children}
      </Col>
    </Row>
  </section>
);

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Loading;
