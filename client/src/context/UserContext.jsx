import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the context
export const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user data from the backend (You can replace the URL with your API endpoint)
  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/user'); // Adjust the endpoint as needed
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await fetchUser();
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
