import React from 'react';
import Button from '../util/Button';

const FilterOrders = () => (
  <div className="filter">
    From: <input type="date" />
    <span className="bar">&ThinSpace;|&ThinSpace;</span>
    To: <input type="date" />
    <Button
      className="btn btn-default font-weight-bold"
      value="Filter Orders"
    />
  </div>
);

export default FilterOrders;
