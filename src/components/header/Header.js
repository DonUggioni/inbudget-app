import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContextValues } from '../store/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firestore/firestore-config';

import './Header.scss';
import userImage from '../../assets/images/myPhoto.JPG';

function Header() {
  const authContext = useContext(AuthContextValues);
  const [username, setUsername] = useState('');
  const usersRef = useMemo(
    () => doc(db, 'users', localStorage.getItem('userId')),
    []
  );

  useEffect(() => {
    async function getUsername() {
      const docSnap = await getDoc(usersRef);

      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }
    getUsername();
  }, [usersRef]);

  function logoutHandler() {
    authContext.logout();
  }

  return (
    <header className="header">
      <span className="header__logo">inBudget</span>
      <div className="header__user-container">
        <span className="header__greeting">Hello,</span>
        <span className="header__username">{username}</span>
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
