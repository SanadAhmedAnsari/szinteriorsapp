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
      aboutText: { value: 'With over a decade of experience, Apka Interior Wala has been at the forefront of creating luxury spaces that blend functionality with aesthetic brilliance.' },
    }
  });

  const aboutRef = doc(db, 'pages', 'about');
  batch.set(aboutRef, {
    sections: {
      introTitle: { value: 'Our Journey of Excellence' },
      introText: { value: 'Founded in Bhopal, Apka Interior Wala has grown into an international agency known for its commitment to quality and innovation.' },
      mission: { value: 'To transform our clients\' visions into reality through exceptional design and superior craftsmanship.' },
      vision: { value: 'To be the global leader in luxury interior design and sustainable construction solutions.' },
    }
  });

  // 2. Seed Settings
  const seoRef = doc(db, 'settings', 'seo');
  batch.set(seoRef, {
    metaTitle: 'Apka Interior Wala | Best Interior Designer in Bhopal & Indore | Affordable Interior firm',
    metaDescription: 'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, India, offering affordable luxury residential and commercial solutions.',
    keywords: 'best interior, interior design bhopal, construction agency india, luxury home interiors, commercial interior design, best company for interior',
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
    companyName: 'Apka Interior Wala',
    email: 'info@apkainteriorwala.com',
    phone: '+91 78933 65987',
    address: '10, Patwa Market, Near Bharat Talkies, Bhopal, Madhya Pradesh, India',
    socials: {
      instagram: 'https://instagram.com/apkainteriorwala',
      facebook: 'https://facebook.com/apkainteriorwala',
      linkedin: 'https://linkedin.com/company/apkainteriorwala',
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
