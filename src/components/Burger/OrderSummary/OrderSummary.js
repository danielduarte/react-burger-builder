import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(ingKey => {
      return (
        <li key={ingKey}>
          <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
        </li>
      );
    });

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger" onClick={props.onCancel}>CANCEL</Button>
      <Button buttonType="Success" onClick={props.onContinue}>CONTINUE</Button>
    </Fragment>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
};

export default orderSummary;
