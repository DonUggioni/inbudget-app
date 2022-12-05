import React from 'react';

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
            <input type="email" className="email" name="email" />
          </div>
          <div className="wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" className="password" name="password" />
          </div>
        </div>
        <button className="login__submit--btn">Sign in</button>
      </div>
    </div>
  );
}

export default UserLogin;
