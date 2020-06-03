import React, { Component, Fragment } from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  tomato: 0.6,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.6,
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
        this.updatePurchaseState(response.data);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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

  purchaseContinueHandler = () => {
    const queryParams = Object.entries({
      ...this.state.ingredients,
      price: this.state.totalPrice,
    });
    const queryString = '?' + queryParams.reduce((acc, [ingredient, qty]) => {
      return acc + `&${encodeURIComponent(ingredient)}=${encodeURIComponent(qty)}`;
    }, '').substr(1);

    this.props.history.push({
      pathname: '/checkout',
      search: queryString,
    });
  };

  render() {
    const disabledInfo = Object.keys(this.state.ingredients || {}).reduce((acc, ingKey) => {
      acc[ingKey] = this.state.ingredients[ingKey] === 0;
      return acc;
    }, {});

    let orderSummary = null;

    let burger = (this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients could not be loaded!</p> : <Spinner />);

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          onContinue={this.purchaseContinueHandler}
          onCancel={this.purchaseCancelHandle}/>
      );

      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            onAddIngredient={this.addIngredientHandler}
            onRemoveIngredient={this.removeIngredientHandler}
            onOrder={this.purchaseHandler}/>
        </Fragment>
      );
    }

    if (this.state.loading) {
      orderSummary = (<Spinner />);
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandle}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
