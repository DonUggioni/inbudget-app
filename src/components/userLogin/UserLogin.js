import React, { useContext, useRef } from 'react';
import { AuthContextValues } from '../store/AuthContext';
import { FcGoogle } from 'react-icons/fc';

import './UserLogin.scss';
import { Link } from 'react-router-dom';

function UserLogin() {
  const authCtx = useContext(AuthContextValues);
  const emailRef = useRef();
  const passwordRef = useRef();

  function clickHandler(e) {
    e.preventDefault();
    authCtx.login();
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }
  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__header--wrapper">
          <h1 className="login__header">inBudget</h1>
        </div>
        <div className="login__input--wrapper">
          <form onSubmit={(e) => clickHandler(e)}>
            <div className="wrapper wrapper__email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="input email"
                name="email"
                placeholder="Enter email address"
                onChange={(e) => authCtx.setLoginEmail(e.target.value)}
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
                onChange={(e) => authCtx.setLoginPassword(e.target.value)}
                ref={passwordRef}
              />
            </div>
            <button className="btn login__submit--btn">Sign in</button>
          </form>
          <span className="login__divider">OR</span>
          <button className="btn login__google--btn">
            <FcGoogle size={24} /> Sign in with Google
          </button>
        </div>
        <p className="login__no_account_message">
          Don't have an account yet? Click <Link to={'/signup'}>here.</Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
