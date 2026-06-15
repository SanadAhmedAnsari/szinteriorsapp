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
      "@type": ["GeneralContractor", "HomeAndConstructionBusiness", "ProfessionalService"],
      "@id": "https://apkainteriorwala.com/#business",
      "name": "Apka Interior Wala Design Studio",
      "url": "https://apkainteriorwala.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://apkainteriorwala.com/favicon.png",
        "width": 512,
        "height": 512
      },
      "image": [
        "https://apkainteriorwala.com/images/marble-kitchen.jpg",
        "https://apkainteriorwala.com/images/living-room-partition.jpg",
        "https://apkainteriorwala.com/images/bedroom-render.jpg"
      ],
      "telephone": "+91-7893365987",
      "email": "info@apkainteriorwala.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Bank Transfer, UPI",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 10, Patwa Market, Near Bharat Talkies",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.2605,
        "longitude": 77.4103
      },
      "hasMap": "https://maps.google.com/?q=Patwa+Market+Near+Bharat+Talkies+Bhopal",
      "areaServed": [
        "Arera Colony, Bhopal",
        "MP Nagar, Bhopal",
        "Koh-e-Fiza, Bhopal",
        "Gulmohar, Bhopal",
        "Hoshangabad Road, Bhopal",
        "New Market, Bhopal",
        "Shivaji Nagar, Bhopal",
        "Bhopal Junction, Bhopal",
        "Bawadiya Kala, Bhopal",
        "Bagmughaliya, Bhopal",
        "Baghsewaniya, Bhopal",
        "Kolar, Bhopal",
        "Katara Hills, Bhopal",
        "Rohit Nagar, Bhopal",
        "Salaiya, Bhopal",
        "Badwai, Bhopal",
        "Airport Road, Bhopal",
        "Bairagarh, Bhopal",
        "Indore",
        "Madhya Pradesh"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-7893365987",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://www.instagram.com/apka_interior_wala_bhopal/"
      ]
    };
  }

  if (type === 'Project') {
    return {
      ...baseSchema,
      "@type": "CreativeWork",
      "name": data.title,
      "description": data.description,
      "image": data.image,
      "locationCreated": {
        "@type": "Place",
        "name": data.location || "Bhopal",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": data.location || "Bhopal",
          "addressRegion": "Madhya Pradesh",
          "addressCountry": "IN"
        }
      },
      "creator": {
        "@type": "LocalBusiness",
        "name": "Apka Interior Wala",
        "url": "https://apkainteriorwala.com"
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
