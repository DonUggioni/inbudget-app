import React, { useContext } from 'react';
import { AuthContextValues } from '../store/AuthContext';

import './Header.scss';
import userImage from '../../assets/images/myPhoto.JPG';

function Header() {
  const authContext = useContext(AuthContextValues);

  function logoutHandler() {
    authContext.logout();
  }

  return (
    <header className="header">
      <span className="header__logo">inBudget</span>
      <div className="header__user-container">
        <span className="header__greeting">Hello,</span>
        <span className="header__username">{authContext.user?.email}</span>
        <button className="header__sign_out--btn" onClick={logoutHandler}>
          Sign out
        </button>
        <div className="header__user_image-container">
          <img className="header__user_image" src={userImage} alt="User" />
        </div>
      </div>
    </header>
  );
}

export default Header;
