import React, { Component } from 'react';
import { Route } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {},
    price: 0,
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const ingredients = [...searchParams.entries()].reduce((acc, [ingredient, qty]) => ({...acc, [ingredient]: +qty}), {});

    const totalPrice = ingredients.price;
    delete ingredients.price;

    this.setState({ ingredients, totalPrice });
  }

  onCheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancel={this.onCheckoutCancelHandler}
          onCheckoutContinue={this.onCheckoutContinueHandler} />

        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
      </div>
    );
  }
}

export default Checkout;
