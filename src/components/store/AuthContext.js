import React, { createContext } from 'react';

import { auth } from '../../firestore/firestore-config';

export const AuthContextValues = createContext(null);

function AuthContext({ children }) {
  const value = {};
  return (
    <AuthContextValues.Provider value={value}>
      {children}
    </AuthContextValues.Provider>
  );
}

export default AuthContext;
