import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  buttonStyle: string;
}

const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#1c1917',
  secondaryColor: '#a8a29e',
  accentColor: '#d4af37',
  fontFamily: 'Inter',
  borderRadius: '1.5rem',
  buttonStyle: 'sharp',
};

const ThemeContext = createContext<{
  theme: ThemeSettings;
  loading: boolean;
}>({
  theme: DEFAULT_THEME,
  loading: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'theme'), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as ThemeSettings;
        setTheme({ ...DEFAULT_THEME, ...data });
        
        // Apply to CSS variables
        const root = document.documentElement;
        root.style.setProperty('--primary-color', data.primaryColor || DEFAULT_THEME.primaryColor);
        root.style.setProperty('--secondary-color', data.secondaryColor || DEFAULT_THEME.secondaryColor);
        root.style.setProperty('--accent-color', data.accentColor || DEFAULT_THEME.accentColor);
        root.style.setProperty('--border-radius', data.borderRadius || DEFAULT_THEME.borderRadius);
        
        // Font family
        root.style.setProperty('--font-family', data.fontFamily || DEFAULT_THEME.fontFamily);
        
        // Button radius mapping
        let btnRadius = '0px';
        if (data.buttonStyle === 'rounded') btnRadius = '0.75rem';
        if (data.buttonStyle === 'pill') btnRadius = '9999px';
        root.style.setProperty('--button-radius', btnRadius);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error listening to theme changes:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
