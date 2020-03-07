import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

  state = {
    ingredients: {}
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const ingredients = [...searchParams.entries()].reduce((acc, [ingredient, qty]) => ({...acc, [ingredient]: +qty}), {});

    this.setState({ ingredients });
  }

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
