import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.module.css';

const drawerToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.onClick}>
    <div/>
    <div/>
    <div/>
  </div>
);

drawerToggle.propTypes = {
  onClick: PropTypes.func,
};

export default drawerToggle;
