import React, { useState, useEffect, useContext, useCallback } from 'react';

import {
  AUTH_STORAGE_KEY,
  AUTH_USER_KEY,
  CONTENT_USER_FAVORITES_KEY,
} from '../../utils/constants';
import { storage } from '../../utils/storage';

const mockedUser = {
  id: '123',
  name: 'Wizeline',
  avatarUrl:
    'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
};

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const lastAuthState = storage.get(AUTH_STORAGE_KEY);
    const isAuthenticated = Boolean(lastAuthState);

    setAuthenticated(isAuthenticated);
  }, []);

  const login = useCallback((username, password) => {
    if (username === 'wizeline' && password === 'Rocks!') {
      setAuthenticated(true);
      storage.set(AUTH_STORAGE_KEY, true);
      storage.set(AUTH_USER_KEY, mockedUser);
      storage.set(CONTENT_USER_FAVORITES_KEY, []);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    storage.set(AUTH_STORAGE_KEY, false);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
export default AuthProvider;
