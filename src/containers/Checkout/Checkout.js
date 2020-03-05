import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      tomato: 1
    }
  };

  onCheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/information');
  };

  render() {
    return (
      <CheckoutSummary
        ingredients={this.state.ingredients}
        onCheckoutCancel={this.onCheckoutCancelHandler}
        onCheckoutContinue={this.onCheckoutContinueHandler}
      />
    );
  }
}

export default Checkout;
