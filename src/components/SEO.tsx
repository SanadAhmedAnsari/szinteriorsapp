import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const DOMAIN = 'https://apkainteriorwala.com';
const DEFAULT_OG_IMAGE = `${DOMAIN}/images/marble-kitchen.jpg`;

const DEFAULT_SEO: SEOSettings = {
  metaTitle: 'Apka Interior Wala | Best Interiors & Construction Bhopal',
  metaDescription: 'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, Indore, and Madhya Pradesh. Affordable and high-quality Pinterest-inspired solutions.',
  keywords: 'best interior, interior design, construction, bhopal, indore, thekedar, carpenter solution, false ceiling experts, best company for interior',
  ogImage: DEFAULT_OG_IMAGE,
};

const ROUTE_NAMES: Record<string, string> = {
  '/about': 'About Us',
  '/services': 'Services',
  '/projects': 'Portfolio',
  '/journal': 'Design Journal',
  '/testimonials': 'Client Reviews',
  '/contact': 'Contact',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
};

function buildBreadcrumb(pathname: string) {
  const parentPath = pathname.startsWith('/projects/') ? '/projects'
    : pathname.startsWith('/journal/') ? '/journal'
    : pathname;

  const pageName = ROUTE_NAMES[parentPath];
  if (!pageName) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': DOMAIN },
      { '@type': 'ListItem', 'position': 2, 'name': pageName, 'item': `${DOMAIN}${parentPath}` },
    ],
  };
}

export function SEO() {
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);
  const [schema] = useState<any>(generateSchema('Organization', {}));
  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'seo'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as SEOSettings;
        setSeo({ ...DEFAULT_SEO, ...data });
      }
    });
    return () => unsubscribe();
  }, []);

  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const breadcrumb = buildBreadcrumb(pathname);

  return (
    <Helmet>
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      <meta name="keywords" content={`${seo.keywords}, ${SEO_KEYWORDS.primary.join(', ')}, ${SEO_KEYWORDS.colloquial.join(', ')}`} />

      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : DOMAIN} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.metaTitle} />
      <meta property="og:description" content={seo.metaDescription} />
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.metaTitle} />
      <meta name="twitter:description" content={seo.metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* LocalBusiness / InteriorDesignStudio JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      {/* BreadcrumbList JSON-LD */}
      {breadcrumb && (
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      )}
    </Helmet>
  );
}
