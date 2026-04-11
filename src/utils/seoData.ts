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
    'Modern office design Indore'
  ],
  colloquial: [
    'Thekedar in Bhopal',
    'Theka construction',
    'Carpenter solution Bhopal',
    'Plumbing solution Bhopal',
    'False ceiling experts',
    'Pinterest-inspired home designs'
  ]
};

export const PROJECT_SLUGS = {
  'project-1': 'interior-designer-in-bhopal-luxury-villa',
  'project-2': 'modular-kitchen-bhopal-modern-design',
  'project-3': 'false-ceiling-experts-bhopal-office',
  'project-4': 'construction-contractor-madhya-pradesh-residence'
};

export const generateSchema = (type: 'Organization' | 'Project' | 'Article', data: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  if (type === 'Organization') {
    return {
      ...baseSchema,
      "name": "SZ Interiors & Construction",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
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
        "name": data.author || "SZ Interiors"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SZ Interiors & Construction"
      },
      "datePublished": data.publishedAt
    };
  }

  return baseSchema;
};
