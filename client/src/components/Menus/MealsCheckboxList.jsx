import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Loading from '../util/Loading';

export const MealsCheckboxList = ({
  meals, handleCheck, isFetching, checkedMeals,
}) => {
  const handleChange = (event) => {
    handleCheck(event);
  };
  const checkboxStyle = {
    width: 'inherit',
    display: 'inline',
    margin: '0.25rem',
  };

  if (isFetching) {
    return (
      <Loading text="fetching meals..." >
        <Preloader size="small" flashing />
      </Loading>
    );
  }
  const checkboxList = meals.map(meal => (
    <div key={meal.id} style={{ margin: '.5rem 0' }}>
      <input
        type="checkbox"
        name={`meal-${meal.id}`}
        onChange={handleChange}
        defaultChecked={checkedMeals[`meal-${meal.id}`]}
        style={checkboxStyle}
      />
      <label style={{ margin: '0.75rem' }}>
        <span>{meal.name}</span>
      </label>
    </div>
  ));
  return <React.Fragment>{checkboxList}</React.Fragment>;
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
});

MealsCheckboxList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCheck: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  checkedMeals: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default connect(mapStateToProps)(MealsCheckboxList);
