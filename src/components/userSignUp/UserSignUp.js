import React, { useContext, useRef } from 'react';
import { AuthContextValues } from '../store/AuthContext';
import { FcGoogle } from 'react-icons/fc';

import './UserSignUp.scss';
import { Link } from 'react-router-dom';

function UserSignUp() {
  const authCtx = useContext(AuthContextValues);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  function clickHandler() {
    authCtx.register();
    emailRef.current.value = '';
    passwordRef.current.value = '';
    usernameRef.current.value = '';
  }
  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__header--wrapper">
          <h1 className="signup__header">inBudget</h1>
        </div>
        <div className="signup__input--wrapper">
          <div className="wrapper wrapper__email">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              className="input username"
              name="username"
              placeholder="Enter username"
              onChange={(e) => authCtx.setRegisterUsername(e.target.value)}
              ref={usernameRef}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="input email"
              name="email"
              placeholder="Enter email address"
              onChange={(e) => authCtx.setRegisterEmail(e.target.value)}
              ref={emailRef}
            />
          </div>
          <div className="wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => authCtx.setRegisterPassword(e.target.value)}
              ref={passwordRef}
            />
          </div>
          <button className="btn signup__submit--btn" onClick={clickHandler}>
            Sign up
          </button>
          <span className="signup__divider">OR</span>
          <button
            className="btn signup__google--btn"
            onClick={() => authCtx.googleSignUp()}
          >
            <FcGoogle size={24} /> Sign up with Google
          </button>
        </div>
        <p className="signup__no_account_message">
          Already have an account? Click <Link to={'/'}>here.</Link>
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;
