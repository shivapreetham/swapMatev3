import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../configuration';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(true); // or fetch user details if needed
    }
  }, []);

  const signup = async (username, password, collegeEmail, personalEmail) => {
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
        collegeEmail,
        personalEmail,
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(true);
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(true);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
