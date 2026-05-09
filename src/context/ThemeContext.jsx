import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // LocalStorage se check karo ki user ne pehle kya theme rakhi thi
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light'; // Default dark hai
  });

  useEffect(() => {
    const root = document.documentElement; // <html> tag
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};