import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.css'

const backdrop = (props) => (
  props.show
    ? <div
        className={classes.Backdrop}
        onClick={props.onClick} />
    : null
);

backdrop.propTypes = {
  onClick: PropTypes.func,
};

export default backdrop;
