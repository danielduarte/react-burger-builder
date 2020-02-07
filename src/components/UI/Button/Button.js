import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';
const button = props => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.onClick}
    >{props.children}</button>
);

button.propTypes = {
  buttonType: PropTypes.string,
  onClick: PropTypes.func,
};

export default button;
