import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = () => (
  <div className={classes.BuildControls}>
    <BuildControl />
    <BuildControl />
    <BuildControl />
  </div>
);

export default buildControls;
