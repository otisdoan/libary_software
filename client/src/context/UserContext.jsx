/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedEmail = localStorage.getItem('email');

    if (accessToken) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setEmail(user);
    localStorage.setItem('email', user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, email, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}; 