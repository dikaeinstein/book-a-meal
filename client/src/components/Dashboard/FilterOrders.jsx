import React from 'react';
import Button from '../util/Button';

const FilterOrders = () => {
  return (
    <div className="filter">
      From: <input type="date" className="filter-input" />
      To: <input type="date" className="filter-input" />
      <Button
        className="btn btn-default"
        value="Filter Orders"
      />
    </div>
  );
};

export default FilterOrders;
