import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Tomato', type: 'tomato' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl
        key={control.type}
        label={control.label}
        onAdd={() => props.onAddIngredient(control.type)}
        onRemove={() => props.onRemoveIngredient(control.type)}
        disabled={props.disabled[control.type]} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.onOrder}>ORDER NOW</button>
  </div>
);

buildControls.propTypes = {
  price: PropTypes.number,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  onAddIngredient: PropTypes.func,
  onRemoveIngredient: PropTypes.func,
  onOrder: PropTypes.func,
};

export default buildControls;
