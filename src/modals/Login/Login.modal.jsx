import React, { createRef } from 'react';

import { Modal, Backdrop, Fade, Paper, Button } from '@material-ui/core';

import { useAuth } from '../../providers/Auth';

import './Login.styles.css';

function LoginModal({ open, handleClose }) {
  const userRef = createRef();
  const passRef = createRef();
  const { login } = useAuth();

  function delayedLogin() {
    setTimeout(() => {
      const isLogged = login(userRef.current.value, passRef.current.value);
      if (isLogged) handleClose();
    }, 500);
  }

  return (
    <Modal
      className="LoginModal"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="LoginModalContainer">
          <Paper className="LoginModalCard">
            <h3>Welcome Back!</h3>
            <input
              ref={userRef}
              placeholder="Username"
              type="text"
              className="ModalInput"
            />
            <input
              ref={passRef}
              placeholder="Password"
              type="password"
              className="ModalInput"
            />
            <Button className="LoginModalButton ModalInput" onClick={delayedLogin}>
              Login
            </Button>
          </Paper>
        </div>
      </Fade>
    </Modal>
  );
}

export default LoginModal;
