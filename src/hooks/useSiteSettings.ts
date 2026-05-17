import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface SiteSettingsData {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
}

const DEFAULTS: SiteSettingsData = {
  companyName: 'Apka Interior Wala',
  phone: '+91 78933 65987',
  email: 'info@apkainteriorwala.com',
  address: '10, Patwa Market, Near Bharat Talkies, Bhopal, Madhya Pradesh, India',
  socials: {
    instagram: 'https://instagram.com/apkainteriorwala',
    facebook: 'https://facebook.com/apkainteriorwala',
    linkedin: 'https://linkedin.com/company/apkainteriorwala',
    youtube: 'https://youtube.com/szinteriors',
  },
};

export function useSiteSettings(): SiteSettingsData {
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULTS);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site'), (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULTS, ...(snap.data() as SiteSettingsData) });
      }
    });
    return unsubscribe;
  }, []);

  return settings;
}
