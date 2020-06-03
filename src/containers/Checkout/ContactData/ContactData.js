import React, { Component } from 'react';

import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      country: '',
      street: '',
      zipCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Daniel Duarte',
        address: {
          street: 'Fake St. 1234',
          zipCode: 7001,
          country: 'Argentina',
        },
        email: 'danieldd.ar@gmail.com',
      },
      deliveryMethod: 'cheaper',
    };

    axios.post('/orders.json', data)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });

  };

  render() {
    let form = (
      <form>
        <input className={classes.Input} name="name" placeholder="Your Name" />
        <input className={classes.Input} name="email" placeholder="Your Email" />
        <input className={classes.Input} name="country" placeholder="Country" />
        <input className={classes.Input} name="street" placeholder="Street" />
        <input className={classes.Input} name="zip" placeholder="Zip Code" />

        <Button buttonType="Success" onClick={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
