import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.6,
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const ingredientsSum = Object.keys(ingredients)
      .reduce((acc, ingKey) => acc + ingredients[ingKey], 0);
    this.setState({ purchasable: ingredientsSum > 0 });
  };

  addIngredientHandler = (type, qty = 1) => {
    const newIngredients = {...this.state.ingredients};

    const newQty = newIngredients[type] + qty;
    if (newQty < 0) {
      return;
    }

    newIngredients[type] = newQty;

    const newPrice = this.state.totalPrice + qty * INGREDIENT_PRICES[type];

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(newIngredients);
  };

  removeIngredientHandler = (type) => {
    this.addIngredientHandler(type, -1);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandle = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disabledInfo = Object.keys(this.state.ingredients).reduce((acc, ingKey) => {
      acc[ingKey] = this.state.ingredients[ingKey] === 0;
      return acc;
    }, {});

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandle}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          onOrder={this.purchaseHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
