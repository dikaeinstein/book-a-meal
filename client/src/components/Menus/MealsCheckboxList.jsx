import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Loading from '../util/Loading';

const ConnectedMealsCheckboxList = ({
  meals, handleCheck, isFetching, checkedMeals,
}) => {
  const handleChange = (event) => {
    handleCheck(event);
  };

  return isFetching
    ?
      <Loading text="fetching meals..." >
        <Preloader size="small" flashing />
      </Loading>
    :
    meals.map(meal => (
      <div key={meal.id} style={{ margin: '.5rem 0' }}>
        <label>
          <input
            type="checkbox"
            name={`meal-${meal.id}`}
            onClick={handleChange}
            onChange={handleChange}
            checked={checkedMeals[`meal-${meal.id}`]}
          />
          <span>{meal.name}</span>
        </label>
      </div>
    ));
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
});

ConnectedMealsCheckboxList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCheck: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  checkedMeals: PropTypes.objectOf(PropTypes.bool).isRequired,
};

const MealsCheckboxList = connect(mapStateToProps)(ConnectedMealsCheckboxList);

export default MealsCheckboxList;
