import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

  render() {
    const disabledInfo = Object.keys(this.state.ingredients).reduce((acc, ingKey) => {
      acc[ingKey] = this.state.ingredients[ingKey] === 0;
      return acc;
    }, {});

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
