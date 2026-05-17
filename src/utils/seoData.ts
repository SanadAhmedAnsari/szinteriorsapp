/**
 * SEO Data Utility
 * Maps projects and pages to long-tail keywords for AI-Search (SGE) optimization.
 */

export const SEO_KEYWORDS = {
  primary: [
    'Best interior designer in Bhopal',
    'Best interior designer in India',
    'Best interior design studio in Bhopal',
    'Best interior design firm in Bhopal',
    'Best interior design company in Bhopal',
    'Best interior design company in Madhya Pradesh',
    'Top interior designer Madhya Pradesh',
    'Affordable interior designer Bhopal',
    'Affordable interior design studio Bhopal',
    'Luxury home interiors Bhopal',
    'Construction contractor Bhopal',
    'Construction contractor Madhya Pradesh',
    'Best construction firm Bhopal',
    'Home construction company Bhopal',
    'Luxury home renovation Bhopal',
    'Residential interior design Bhopal',
    'Commercial interior design Bhopal',
    'Office interior design Bhopal',
    'Turnkey interior solutions Bhopal',
  ],
  services: [
    'Modular kitchen Bhopal',
    'Modular kitchen design Bhopal',
    'Modular kitchen cost Bhopal',
    'False ceiling Bhopal',
    'POP false ceiling Bhopal',
    'Gypsum ceiling Bhopal',
    'False ceiling design Bhopal',
    'False ceiling cost Bhopal',
    'Custom furniture Bhopal',
    'Modular furniture Bhopal',
    'Wardrobe design Bhopal',
    'Bedroom wardrobe Bhopal',
    'TV unit design Bhopal',
    'Furniture carpenter Bhopal',
    'Wooden furniture Bhopal',
    'Home renovation Bhopal',
    'Kitchen renovation Bhopal',
    'Bathroom renovation Bhopal',
    'Space planning Bhopal',
    'Waterproofing contractor Bhopal',
  ],
  colloquial: [
    'Apka Interior Wala',
    'Interior Wala Bhopal',
    'Thekedar Bhopal',
    'Theka construction Bhopal',
    'Construction thekedar Madhya Pradesh',
    'Best thekedar for interior',
    'Carpenter Bhopal',
    'Carpenter solution Bhopal',
    'Plumber Bhopal',
    'Plumbing solution Bhopal',
    'False ceiling experts Bhopal',
    'Pinterest home design Bhopal',
    'Instagram home decor Bhopal',
    'Home decor Bhopal',
    'Interior wala near me',
    'Interior designer near me Bhopal',
  ],
};

export const generateSchema = (type: 'Organization' | 'Project' | 'Article', data: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  if (type === 'Organization') {
    return {
      ...baseSchema,
      "name": "Apka Interior Wala",
      "url": "https://apkainteriorwala.com",
      "logo": "https://apkainteriorwala.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-7893365987",
        "contactType": "customer service"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bhopal",
        "addressRegion": "MP",
        "addressCountry": "IN"
      }
    };
  }

  if (type === 'Project') {
    return {
      ...baseSchema,
      "name": data.title,
      "description": data.description,
      "image": data.image,
      "location": {
        "@type": "Place",
        "name": data.location || "Bhopal"
      }
    };
  }

  if (type === 'Article') {
    return {
      ...baseSchema,
      "headline": data.title,
      "image": data.image,
      "author": {
        "@type": "Person",
        "name": data.author || "Apka Interior Wala"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Apka Interior Wala"
      },
      "datePublished": data.publishedAt
    };
  }

  return baseSchema;
};
