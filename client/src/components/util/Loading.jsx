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
const Loading = props => (
  <section>
    <Row>
      <Col s={12}>
        <strong>{props.text}</strong>
        {props.children}
      </Col>
    </Row>
  </section>
);

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Loading;
