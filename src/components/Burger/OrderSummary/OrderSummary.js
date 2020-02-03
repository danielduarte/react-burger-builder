import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

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
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger" onClick={props.onCancel}>CANCEL</Button>
      <Button buttonType="Success" onClick={props.onContinue}>CONTINUE</Button>
    </Fragment>
  );
};

export default orderSummary;
