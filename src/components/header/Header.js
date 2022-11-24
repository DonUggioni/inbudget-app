import React from 'react';

import './Header.scss';
import userImage from '../../assets/images/myPhoto.JPG';

function Header() {
  return (
    <header className="header">
      <span className="header__logo">inBudget</span>
      <div className="header__user-container">
        <span className="header__greeting">Hello,</span>
        <span className="header__username">John Doe</span>
        <div className="header__user_image-container">
          <img className="header__user_image" src={userImage} alt="User" />
        </div>
      </div>
    </header>
  );
}

export default Header;
