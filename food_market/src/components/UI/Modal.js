import React, { Fragment } from 'react';
import classes from './Modal.module.css'
import { createPortal } from "react-dom";

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onHideCart}/>
}
const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}
const portal = document.getElementById('overlays')

const Modal = (props) => {

  return (
    <Fragment>
      {createPortal(<Backdrop onHideCart={props.onHideCart}/>, portal)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portal)}
    </Fragment>
  )
};

export default Modal;