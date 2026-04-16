import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(savedDarkMode);
      
      if (savedDarkMode) {
        document.body.classList.add('dark');
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  }, []);

  const toggleDarkMode = () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      localStorage.setItem('darkMode', newDarkMode);
      
      if (newDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error toggling dark mode:', error);
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      if (newDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  };

  return { isDarkMode, toggleDarkMode };
};
