import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { generateSchema, SEO_KEYWORDS } from '../utils/seoData';

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}

const DEFAULT_SEO: SEOSettings = {
  metaTitle: 'Apka Interior Wala | Best Interiors & Construction Bhopal',
  metaDescription: 'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, Indore, and Madhya Pradesh. Affordable and high-quality Pinterest-inspired solutions.',
  keywords: 'best interior, interior design, construction, bhopal, indore, thekedar, carpenter solution, false ceiling experts, best company for interior',
  ogImage: '',
};

export function SEO() {
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'seo'), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as SEOSettings;
        setSeo({ ...DEFAULT_SEO, ...data });
        setSchema(generateSchema('Organization', {}));
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
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://apkainteriorwala.com'} />
      
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

