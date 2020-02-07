import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <Fragment>
    <Backdrop show={props.show} onClick={props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}>
      {props.children}
    </div>
  </Fragment>
);

modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
};

export default modal;
