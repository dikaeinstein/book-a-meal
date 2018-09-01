import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inherits } from 'util';


class Paginate extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleNext(event) {
    event.preventDefault();
    this.props.onPageChange(this.props.nextUrl);
  }

  handlePrevious(event) {
    event.preventDefault();
    this.props.onPageChange(this.props.previousUrl);
  }

  render() {
    const btnStyle = {
      margin: '1rem .5rem',
      background: 'none',
      color: '#eb480b',
      border: 'none',
    };
    const paginationStyle = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1rem',
    };
    const paginationTextStyle = { margin: '.25rem', background: 'inherits' };

    return (
      <div style={{ ...paginationStyle, ...this.props.style }}>
        {this.props.previousUrl &&
          <button
            onClick={this.handlePrevious}
            style={btnStyle}
          >
            <span style={paginationTextStyle}>Previous</span>
            <i className="fas fa-arrow-alt-circle-left" />
          </button>}
        {this.props.nextUrl &&
          <button
            onClick={this.handleNext}
            style={btnStyle}
          >
            <i className="fas fa-arrow-alt-circle-right" />
            <span style={paginationTextStyle}>Next</span>
          </button>}
      </div>
    );
  }
}

Paginate.defaultProps = {
  style: {},
  nextUrl: '',
  previousUrl: '',
};

Paginate.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

export default Paginate;
