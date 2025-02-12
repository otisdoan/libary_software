import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    if (accessToken) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('username', user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}; 