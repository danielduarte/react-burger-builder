import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  const attachedClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close
  ];

  return (
    <Fragment>
      <Backdrop show={props.open} onClick={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

sideDrawer.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func,
};

export default sideDrawer;
