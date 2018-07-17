import React from 'react';
import PropTypes from 'prop-types';

const MealsCheckboxList = ({ meals, handleCheck }) => {
  const handleClick = (event) => {
    handleCheck(event);
  };

  return meals.map(meal => (
    <div key={meal.id} style={{ margin: '.5rem 0' }}>
      <label>
        <input
          type="checkbox"
          name="meals"
          value={meal.id}
          onClick={handleClick}
        />
        <span>{meal.name}</span>
      </label>
    </div>
  ));
};

MealsCheckboxList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCheck: PropTypes.func.isRequired,
};

export default MealsCheckboxList;
