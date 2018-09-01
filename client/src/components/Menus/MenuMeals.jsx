import React from 'react';
import PropTypes from 'prop-types';

const MenuMeals = ({ meals }) => {
  const renderMealList = () => meals.map(meal => (
    <tr key={String(meal.id)}>
      <td>{meal.name}</td>
      <td>&#x20a6; {meal.price}</td>
    </tr>
  ));

  return (
    <table className="font-weight-bold">
      <tbody>
        {renderMealList()}
      </tbody>
    </table>
  );
};

MenuMeals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuMeals;
