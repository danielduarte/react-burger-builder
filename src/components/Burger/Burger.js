import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingrKey) => {
      return [...Array(props.ingredients[ingrKey])].map((_, i) => (
        <BurgerIngredient key={ingrKey + i} type={ingrKey} />
      ));
    }).reduce((acc, elem) => acc.concat(elem), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please, start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.object,
};

export default burger;
