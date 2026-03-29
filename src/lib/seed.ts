import { db } from '../firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

export async function seedDatabase() {
  const batch = writeBatch(db);

  // 1. Seed Pages
  const homeRef = doc(db, 'pages', 'home');
  batch.set(homeRef, {
    sections: {
      heroTitle: { value: 'Crafting Spaces That Tell Your Story' },
      heroSubtitle: { value: 'Premium interior design and construction services for residential and commercial projects in Bhopal and beyond.' },
      heroImage: { value: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920' },
      aboutTitle: { value: 'Excellence in Design & Construction' },
      aboutText: { value: 'With over a decade of experience, SZ Interiors & Construction has been at the forefront of creating luxury spaces that blend functionality with aesthetic brilliance.' },
    }
  });

  const aboutRef = doc(db, 'pages', 'about');
  batch.set(aboutRef, {
    sections: {
      introTitle: { value: 'Our Journey of Excellence' },
      introText: { value: 'Founded in Bhopal, SZ Interiors & Construction has grown into an international agency known for its commitment to quality and innovation.' },
      mission: { value: 'To transform our clients\' visions into reality through exceptional design and superior craftsmanship.' },
      vision: { value: 'To be the global leader in luxury interior design and sustainable construction solutions.' },
    }
  });

  // 2. Seed Settings
  const seoRef = doc(db, 'settings', 'seo');
  batch.set(seoRef, {
    metaTitle: 'SZ Interiors & Construction | Luxury Interior Design Bhopal',
    metaDescription: 'SZ Interiors & Construction is a premier interior design and construction agency in Bhopal, India, offering luxury residential and commercial solutions.',
    keywords: 'interior design bhopal, construction agency india, luxury home interiors, commercial interior design',
    ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    googleAnalyticsId: '',
    searchConsoleId: '',
    robotsTxt: 'User-agent: *\nAllow: /',
  });

  const themeRef = doc(db, 'settings', 'theme');
  batch.set(themeRef, {
    primaryColor: '#1c1917',
    secondaryColor: '#a8a29e',
    accentColor: '#d4af37',
    fontFamily: 'Inter',
    borderRadius: '1.5rem',
    buttonStyle: 'sharp',
  });

  const siteRef = doc(db, 'settings', 'site');
  batch.set(siteRef, {
    companyName: 'SZ Interiors & Construction',
    email: 'info@szinteriors.com',
    phone: '+91 98765 43210',
    address: 'Arera Colony, Bhopal, Madhya Pradesh, India',
    socials: {
      instagram: 'https://instagram.com/szinteriors',
      facebook: 'https://facebook.com/szinteriors',
      linkedin: 'https://linkedin.com/company/szinteriors',
      youtube: 'https://youtube.com/szinteriors',
    }
  });

  // 3. Seed Services
  const services = [
    { title: 'Residential Interior', description: 'Custom luxury interiors for villas and apartments.', icon: 'Home' },
    { title: 'Commercial Interior', description: 'Innovative office and retail spaces that inspire.', icon: 'Building' },
    { title: 'Turnkey Solutions', description: 'End-to-end management from concept to completion.', icon: 'Key' },
    { title: 'Construction Services', description: 'High-quality construction with international standards.', icon: 'Hammer' },
  ];

  services.forEach((service, index) => {
    const ref = doc(collection(db, 'services'));
    batch.set(ref, { ...service, order: index });
  });

  await batch.commit();
  console.log('Database seeded successfully');
}
