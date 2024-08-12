import { createContext, useState, useEffect } from 'react';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamName, setTeamName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('teamName') || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('teamName', teamName);
    }
  }, [teamName]);

  return (
    <TeamContext.Provider value={{ teamName, setTeamName }}>
      {children}
    </TeamContext.Provider>
  );
};
