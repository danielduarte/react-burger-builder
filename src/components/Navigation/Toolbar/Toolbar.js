import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle onClick={props.onDrawerToggleClick}>Menu</DrawerToggle>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolbar.propTypes = {
  onDrawerToggleClick: PropTypes.func,
};

export default toolbar;
