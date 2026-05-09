import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { generateSchema, SEO_KEYWORDS } from '../utils/seoData';

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  googleAnalyticsId: string;
  searchConsoleId: string;
}

const DEFAULT_SEO: SEOSettings = {
  metaTitle: 'Apka Interior Wala | Best Interior Designer in Bhopal & Indore | Affordable Interior firm',
  metaDescription: 'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, Indore, and Madhya Pradesh. Affordable and high-quality Pinterest-inspired solutions.',
  keywords: 'best interior, interior design, construction, bhopal, indore, thekedar, carpenter solution, false ceiling experts, best company for interior',
  ogImage: '',
  googleAnalyticsId: '',
  searchConsoleId: '',
};

export function SEO() {
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'seo'), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as SEOSettings;
        setSeo({ ...DEFAULT_SEO, ...data });
        
        // Generate Organization Schema
        setSchema(generateSchema('Organization', {}));

        // Analytics (simplified injection)
        if (data.googleAnalyticsId && !window.location.hostname.includes('localhost')) {
          injectGA(data.googleAnalyticsId);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Helmet>
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      <meta name="keywords" content={`${seo.keywords}, ${SEO_KEYWORDS.primary.join(', ')}, ${SEO_KEYWORDS.colloquial.join(', ')}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://apkainteriorwala.com" />
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.metaTitle} />
      <meta property="og:description" content={seo.metaDescription} />
      <meta property="og:url" content="https://apkainteriorwala.com" />
      <meta property="og:type" content="website" />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} /> }

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.metaTitle} />
      <meta name="twitter:description" content={seo.metaDescription} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
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
