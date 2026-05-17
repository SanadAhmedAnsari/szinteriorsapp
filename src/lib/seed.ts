import { db } from '../firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

export async function seedDatabase() {
  const batch = writeBatch(db);

  // ─── 1. Pages ────────────────────────────────────────────────────────────────

  batch.set(doc(db, 'pages', 'home'), {
    sections: {
      heroTitle:    { value: 'Crafting Spaces That Tell Your Story' },
      heroSubtitle: { value: 'Premium interior design and construction services for residential and commercial projects in Bhopal and beyond.' },
      heroImage:    { value: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920' },
      aboutTitle:   { value: 'Excellence in Design & Construction' },
      aboutText:    { value: 'With over a decade of experience, Apka Interior Wala has been at the forefront of creating luxury spaces that blend functionality with aesthetic brilliance.' },
      aboutImage1:  { value: '/images/residential-hallway.jpg' },
      aboutImage2:  { value: '/images/bedroom-render-2.png' },
      ctaImage:     { value: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1920' },
    },
  });

  batch.set(doc(db, 'pages', 'about'), {
    sections: {
      introTitle:   { value: 'Our Journey of Excellence' },
      introText:    { value: 'Founded in Bhopal, Apka Interior Wala has grown from a passionate two-person studio into a full-service design and construction firm trusted across Madhya Pradesh.' },
      founderName:  { value: 'Zainab Khan' },
      founderRole:  { value: 'Founder & Principal Designer' },
      founderBio:   { value: 'Driven by a belief that every space should feel personal, Zainab has spent over a decade turning client visions into meticulously crafted realities — from intimate apartments to landmark commercial builds.' },
      founderImage: { value: '/images/founder-zainab-khan.jpeg' },
      introImage:   { value: '/images/living-room-partition.jpg' },
      mission:      { value: 'To transform our clients\' visions into reality through exceptional design and superior craftsmanship.' },
      vision:       { value: 'To be the most trusted name in luxury interior design and construction across Central India.' },
    },
  });

  // ─── 2. Settings ─────────────────────────────────────────────────────────────

  batch.set(doc(db, 'settings', 'seo'), {
    metaTitle: 'Apka Interior Wala | Best Interior Design & Construction in Bhopal',
    metaDescription: 'Apka Interior Wala delivers premium interior design and construction services in Bhopal, Madhya Pradesh. Residential, commercial, and turnkey solutions.',
    keywords: 'interior design bhopal, best interior designer bhopal, construction agency bhopal, luxury home interiors, modular kitchen bhopal, false ceiling bhopal',
    ogImage: '/images/horizon-villa-day.jpg',
    googleAnalyticsId: '',
    searchConsoleId: '',
    robotsTxt: 'User-agent: *\nAllow: /',
  });

  batch.set(doc(db, 'settings', 'theme'), {
    primaryColor: '#1c1917',
    secondaryColor: '#a8a29e',
    accentColor: '#d4af37',
    fontFamily: 'Inter',
    borderRadius: '1.5rem',
    buttonStyle: 'sharp',
  });

  batch.set(doc(db, 'settings', 'site'), {
    companyName: 'Apka Interior Wala',
    email: 'info@apkainteriorwala.com',
    phone: '+91 78933 65987',
    address: '10, Patwa Market, Near Bharat Talkies, Bhopal, Madhya Pradesh, India',
    socials: {
      instagram: 'https://instagram.com/apkainteriorwala',
      facebook: 'https://facebook.com/apkainteriorwala',
      linkedin: 'https://linkedin.com/company/apkainteriorwala',
      youtube: 'https://youtube.com/szinteriors',
    },
  });

  // ─── 3. Services ─────────────────────────────────────────────────────────────

  const services = [
    { title: 'Residential Interior Design', description: 'Creating luxurious, personalized living spaces that reflect your unique style and personality. From modern apartments to classic villas.', icon: 'Home',      image: '/images/bedroom-render.jpg',           order: 0 },
    { title: 'Commercial Interior Design',  description: 'Designing innovative and functional workspaces that boost productivity and reflect your brand identity. Offices, retail, and hospitality.', icon: 'Building',  image: '/images/one6ne-commercial-3.jpg',       order: 1 },
    { title: 'Turnkey Interior Solutions',  description: 'End-to-end management of your project, ensuring a stress-free experience from conception to handover.', icon: 'Key',       image: '/images/marble-kitchen.jpg',            order: 2 },
    { title: 'Construction Services',       description: 'Professional construction management and execution for residential and commercial projects, maintaining high quality and safety.', icon: 'Hammer',    image: '/images/marble-staircase.jpg',          order: 3 },
    { title: 'Renovation & Remodeling',     description: 'Giving new life to existing spaces through creative remodeling and high-quality renovation work.', icon: 'Paintbrush', image: '/images/blue-kitchen-renovation.jpg',   order: 4 },
    { title: 'Space Planning',              description: 'Optimizing your floor plan for maximum efficiency and flow. We ensure every square foot of your space is utilized effectively.', icon: 'Ruler',     image: '/images/false-ceiling-render.jpg',      order: 5 },
    { title: 'Project Management',          description: 'Professional oversight of your construction or interior project. We ensure quality, budget adherence, and timely delivery.', icon: 'Briefcase', image: '/images/bedroom-wardrobe.jpg',          order: 6 },
    { title: 'Furniture & Custom Joinery',  description: 'Bespoke furniture and woodwork designed and crafted specifically for your space. Quality materials and exquisite finish.', icon: 'Users',     image: '/images/bedroom-wardrobe-study.jpg',    order: 7 },
  ];

  // Use fixed IDs so re-seeding doesn't duplicate
  services.forEach((service) => {
    const id = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    batch.set(doc(db, 'services', id), service);
  });

  // ─── 4. Projects ─────────────────────────────────────────────────────────────

  const projects = [
    {
      title: 'The Horizon - Modern Luxury Villa',
      slug: 'modern-luxury-villa-construction-bhopal',
      category: 'Construction',
      location: 'Arera Colony, Bhopal',
      image: '/images/horizon-villa-day.jpg',
      gallery: [
        '/images/horizon-villa-day.jpg',
        '/images/horizon-villa-night.jpg',
        '/images/marble-staircase.jpg',
        '/images/marble-kitchen.jpg',
        '/images/bedroom-wardrobe.jpg',
      ],
      description: 'Breathtaking multi-story villa construction with stone cladding and glass balconies. A flagship construction project in Bhopal showcasing international standards. Every detail — from the structural planning to the premium marble flooring and bespoke staircase — was executed with precision and care.',
      featured: true,
      createdAt: '2022-08-01T00:00:00.000Z',
    },
    {
      title: 'Blue Heaven - Modular Kitchen Transformation',
      slug: 'modular-kitchen-before-after-bhopal',
      category: 'Renovation',
      location: 'Gulmohar, Bhopal',
      image: '/images/blue-kitchen-renovation.jpg',
      gallery: [
        '/images/blue-kitchen-renovation.jpg',
        '/images/blue-kitchen-before.jpg',
        '/images/modular-kitchen-unit.jpg',
        '/images/grey-wood-kitchen.jpg',
      ],
      description: 'Complete kitchen renovation showcasing a stunning before-and-after transformation with modular light blue cabinetry and designer subway tiling. The space was reimagined from scratch — new layout, island unit, under-cabinet lighting, and a classic blue-and-white palette that gives the kitchen timeless character.',
      featured: false,
      createdAt: '2022-07-15T00:00:00.000Z',
    },
    {
      title: 'ONE 6NE - Commercial Landmark',
      slug: 'commercial-building-interior-design-bhopal',
      category: 'Commercial',
      location: 'MP Nagar, Bhopal',
      image: '/images/one6ne-commercial-1.jpg',
      gallery: [
        '/images/one6ne-commercial-1.jpg',
        '/images/one6ne-commercial-2.jpg',
        '/images/one6ne-commercial-3.jpg',
        '/images/residential-exterior.jpg',
      ],
      description: 'Dynamic commercial building interior and exterior design featuring geometric facades and modern workspace planning. The iconic hexagonal facade and bold orange-black palette make this a landmark destination on one of Bhopal\'s busiest commercial corridors.',
      featured: true,
      createdAt: '2022-06-10T00:00:00.000Z',
    },
    {
      title: 'Regal Residences - Luxury Interiors',
      slug: 'luxury-home-interiors-false-ceiling-bhopal',
      category: 'Residential',
      location: 'Koh-e-Fiza, Bhopal',
      image: '/images/living-room-partition.jpg',
      gallery: [
        '/images/living-room-partition.jpg',
        '/images/bedroom-wardrobe.jpg',
        '/images/residential-hallway.jpg',
        '/images/false-ceiling-render.jpg',
      ],
      description: 'Sophisticated residential interiors featuring premium wardrobes, designer false ceilings, and bespoke mirrored partitions. The living space is anchored by a stunning diamond-mirror accent wall that doubles as a room divider, creating distinct zones while keeping the layout open and airy.',
      featured: false,
      createdAt: '2022-05-20T00:00:00.000Z',
    },
    {
      title: 'Sleek Kitchen - Grey & Wood Finish',
      slug: 'modern-kitchen-designer-bhopal',
      category: 'Residential',
      location: 'Indore Highway, Bhopal',
      image: '/images/grey-wood-kitchen.jpg',
      gallery: [
        '/images/grey-wood-kitchen.jpg',
        '/images/grey-wood-kitchen-2.jpg',
        '/images/marble-kitchen.jpg',
        '/images/modular-kitchen-unit.jpg',
      ],
      description: 'Real completion of a gourmet kitchen with sleek grey and wood finishes, black granite countertops, and a statement island with wood cladding. The warm walnut upper cabinets contrast beautifully against the matte grey lower units, while under-cabinet LED strips add depth and function.',
      featured: false,
      createdAt: '2022-04-05T00:00:00.000Z',
    },
  ];

  // Use slug as document ID — prevents duplicates on re-seed
  projects.forEach((project) => {
    batch.set(doc(db, 'projects', project.slug), project);
  });

  // ─── 5. Blog ─────────────────────────────────────────────────────────────────

  const posts = [
    {
      title: '10 Tips for Designing a Modern Modular Kitchen',
      slug: '10-tips-modern-modular-kitchen-bhopal',
      category: 'Design Tips',
      excerpt: 'A modular kitchen is only as good as its planning. Here are 10 expert tips from our designers to help you get the most out of your kitchen space.',
      content: 'A modular kitchen is only as good as its planning. Here are 10 expert tips from our designers to help you get the most out of your kitchen space.\n\n1. Start with the work triangle...',
      image: '/images/grey-wood-kitchen.jpg',
      author: 'Zainab Khan',
      tags: ['kitchen', 'modular', 'design tips', 'bhopal'],
      published: true,
      publishedAt: '2022-09-01T00:00:00.000Z',
    },
    {
      title: 'False Ceilings: Design, Cost & What to Expect in Bhopal',
      slug: 'false-ceiling-design-cost-bhopal',
      category: 'Construction',
      excerpt: 'False ceilings can transform any room — but they require careful planning. We break down the design options, materials, and typical costs in Bhopal.',
      content: 'False ceilings can transform any room — but they require careful planning. We break down the design options, materials, and typical costs in Bhopal.\n\nThe most common materials are POP, gypsum board, and wood...',
      image: '/images/false-ceiling-render.jpg',
      author: 'Zainab Khan',
      tags: ['false ceiling', 'construction', 'pop', 'bhopal'],
      published: true,
      publishedAt: '2022-08-15T00:00:00.000Z',
    },
    {
      title: 'Before & After: Transforming a Dated Villa into a Luxury Home',
      slug: 'before-after-villa-renovation-bhopal',
      category: 'Project Stories',
      excerpt: 'We take you behind the scenes of one of our most ambitious renovation projects — a 20-year-old villa in Arera Colony that became a modern luxury residence.',
      content: 'We take you behind the scenes of one of our most ambitious renovation projects — a 20-year-old villa in Arera Colony that became a modern luxury residence.\n\nThe brief was clear: keep the bones, transform everything else...',
      image: '/images/residential-hallway.jpg',
      author: 'Zainab Khan',
      tags: ['renovation', 'villa', 'before after', 'arera colony'],
      published: true,
      publishedAt: '2022-07-20T00:00:00.000Z',
    },
  ];

  posts.forEach((post) => {
    batch.set(doc(db, 'blog', post.slug), post);
  });

  await batch.commit();
  console.log('Database seeded successfully');
}
