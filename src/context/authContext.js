import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  UserData: [],
  setUserData: (data) => {},
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setAuthToken(JSON.parse(value));
          isAuthenticated = true;
          console.log('No error');
        }
      } catch (error) {
        console.log('0error', error);
      }
      try {
        const userValue = await AsyncStorage.getItem('user');
        if (userValue !== null) {
          console.log('userValue', JSON.parse(userValue));
          setUserData(JSON.parse(userValue));
        }
      } catch (error) {
        console.log('0error', error);
      }
    };
    getData();
  }, []);
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', JSON.stringify(token));
    isAuthenticated = true;
  }
  function setUserData(data) {
    setUser(data);
    AsyncStorage.setItem('user', JSON.stringify(data));
  }

  function logout() {
    isAuthenticated = false;
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    UserData: user,
    setUserData,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
