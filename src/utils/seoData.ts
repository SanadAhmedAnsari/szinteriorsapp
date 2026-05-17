/**
 * SEO Data Utility
 * Maps projects and pages to long-tail keywords for AI-Search (SGE) optimization.
 */

export const SEO_KEYWORDS = {
  primary: [
    'Best interior designer in Bhopal',
    'Best interior designer in Indore',
    'Construction contractor Madhya Pradesh',
    'Luxury home renovation Bhopal',
    'Modern office design Indore',
    'Best interior',
    'Best company for interior',
    'Best firm for interior',
    'Affordable and best interior solutions in bhopal',
    'Best interior designer in India'
  ],
  colloquial: [
    'Apka Interior Wala',
    'Interior Wala Bhopal',
    'Thekedar in Bhopal',
    'Theka construction',
    'Carpenter solution Bhopal',
    'Plumbing solution Bhopal',
    'False ceiling experts',
    'Pinterest-inspired home designs',
    'Best thekedar for interior'
  ]
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
