import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  googleAnalyticsId: string;
  searchConsoleId: string;
}

const DEFAULT_SEO: SEOSettings = {
  metaTitle: 'SZ Interiors & Construction | Luxury Interior Design Bhopal',
  metaDescription: 'SZ Interiors & Construction is a premier interior design and construction agency in Bhopal, India.',
  keywords: 'interior design, construction, bhopal',
  ogImage: '',
  googleAnalyticsId: '',
  searchConsoleId: '',
};

export function SEO() {
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'seo'), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as SEOSettings;
        setSeo({ ...DEFAULT_SEO, ...data });
        
        // Update document title
        document.title = data.metaTitle || DEFAULT_SEO.metaTitle;
        
        // Update meta tags
        updateMetaTag('description', data.metaDescription || DEFAULT_SEO.metaDescription);
        updateMetaTag('keywords', data.keywords || DEFAULT_SEO.keywords);
        
        // OG tags
        updateMetaTag('og:title', data.metaTitle || DEFAULT_SEO.metaTitle, 'property');
        updateMetaTag('og:description', data.metaDescription || DEFAULT_SEO.metaDescription, 'property');
        if (data.ogImage) {
          updateMetaTag('og:image', data.ogImage, 'property');
        }
        
        // Analytics (simplified injection)
        if (data.googleAnalyticsId && !window.location.hostname.includes('localhost')) {
          injectGA(data.googleAnalyticsId);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return null; // This component doesn't render anything
}

function updateMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function injectGA(id: string) {
  if (document.getElementById('google-analytics')) return;
  
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script1.id = 'google-analytics';
  document.head.appendChild(script1);
  
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');
  `;
  document.head.appendChild(script2);
}
