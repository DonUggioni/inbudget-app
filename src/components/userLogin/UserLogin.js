import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import './UserLogin.scss';

function UserLogin() {
  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__header--wrapper">
          <h1 className="login__header">inBudget</h1>
        </div>
        <div className="login__input--wrapper">
          <div className="wrapper wrapper__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="input email"
              name="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <button className="btn login__submit--btn">Sign in</button>
          <span className="login__divider">OR</span>
          <button className="btn login__google--btn">
            <FcGoogle size={24} /> Sign in with Google
          </button>
        </div>
        <p className="login__no_account_message">
          Don't have an account? Click <span>here.</span>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
