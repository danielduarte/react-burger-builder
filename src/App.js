import React from 'react';
import { Switch, Route } from 'react-router';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" component={BurgerBuilder}/>
          <Route render={() => <h1 style={{ textAlign: 'center' }}>Page Not Found</h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
