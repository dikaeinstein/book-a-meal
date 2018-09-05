import React from 'react';
import PropTypes from 'prop-types';

const MealDetail = ({ meal, closeMealDetail }) => {
  const handleCloseMealDetail = () => closeMealDetail();

  const mealDetailItemStyle = {
    padding: '0 1rem 1rem 1rem',
  };

  return (
    <div className="flex-container">
      <div style={{ ...mealDetailItemStyle, flex: '60%' }}>
        <img src={meal.imageUrl} alt={meal.name} />
      </div>
      <div style={{ ...mealDetailItemStyle, flex: '40%', color: '#000' }}>
        <h4
          className="text-capitalize font-weight-bold"
          style={{ margin: '.875rem 0' }}
        >
          {meal.name}
        </h4>
        <p
          className="font-weight-bold"
          style={{ margin: '.5rem 0' }}
        >
          Description:
        </p>
        <p style={{ fontSize: '.875rem', margin: '.5rem 0' }}>
          {meal.description}
        </p>
        <p style={{ margin: '.875rem 0' }}>
          <span className="font-weight-bold">
            Caterer:{' '}
          </span>
          <span>{meal.user.name}</span>
        </p>
        <div
          onClick={handleCloseMealDetail}
          onKeyPress={handleCloseMealDetail}
          className="text-dark font-weight-bold"
          style={{ cursor: 'pointer', fontSize: '.85rem' }}
          role="button"
          tabIndex="0"
        >
          Back to meals
        </div>
      </div>
    </div>
  );
};

MealDetail.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
  closeMealDetail: PropTypes.func.isRequired,
};

export default MealDetail;
