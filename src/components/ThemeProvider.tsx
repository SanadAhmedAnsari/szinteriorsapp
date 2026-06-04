import React, { createContext, useContext, useEffect } from 'react';

const theme = {
  primaryColor: '#1c1917',
  secondaryColor: '#a8a29e',
  accentColor: '#d4af37',
  fontFamily: 'Inter',
  borderRadius: '1.5rem',
  buttonStyle: 'sharp',
};

const ThemeContext = createContext({ theme });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-family', theme.fontFamily);
    root.style.setProperty('--button-radius', '0px');
  }, []);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
