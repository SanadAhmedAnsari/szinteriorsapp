import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateSchema, SEO_KEYWORDS } from '../utils/seoData';

const DOMAIN = 'https://apkainteriorwala.com';
const DEFAULT_OG_IMAGE = `${DOMAIN}/images/marble-kitchen.jpg`;

const seo = {
  metaTitle: 'Apka Interior Wala | Best Interiors & Construction Bhopal',
  metaDescription:
    'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, Indore, and Madhya Pradesh. Affordable and high-quality Pinterest-inspired solutions.',
  keywords:
    'best interior, interior design, construction, bhopal, indore, thekedar, carpenter solution, false ceiling experts, best company for interior',
  ogImage: DEFAULT_OG_IMAGE,
};

const schema = generateSchema('Organization', {});

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
  const parentPath = pathname.startsWith('/projects/')
    ? '/projects'
    : pathname.startsWith('/journal/')
      ? '/journal'
      : pathname;

  const pageName = ROUTE_NAMES[parentPath];
  if (!pageName) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: pageName, item: `${DOMAIN}${parentPath}` },
    ],
  };
}

export function SEO() {
  const { pathname } = useLocation();
  const breadcrumb = buildBreadcrumb(pathname);

  return (
    <Helmet>
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      <meta
        name="keywords"
        content={`${seo.keywords}, ${SEO_KEYWORDS.primary.join(', ')}, ${SEO_KEYWORDS.colloquial.join(', ')}`}
      />

      <link rel="canonical" href={`${DOMAIN}${pathname}`} />

      <meta property="og:title" content={seo.metaTitle} />
      <meta property="og:description" content={seo.metaDescription} />
      <meta property="og:url" content={`${DOMAIN}${pathname}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.metaTitle} />
      <meta name="twitter:description" content={seo.metaDescription} />
      <meta name="twitter:image" content={seo.ogImage} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      {breadcrumb && (
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      )}
    </Helmet>
  );
}
