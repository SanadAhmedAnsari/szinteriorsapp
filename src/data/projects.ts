export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  loc: string;
  img: string;
  desc: string;
  year?: string;
  area?: string;
  gallery: string[];
}

export const projects: ProjectData[] = [
  {
    id: 'project-horizon',
    title: 'The Horizon - Modern Luxury Villa',
    slug: 'modern-luxury-villa-construction-bhopal',
    category: 'Construction',
    loc: 'Arera Colony, Bhopal',
    img: '/images/horizon-villa-day.jpg',
    desc: 'Breathtaking multi-story villa construction with stone cladding and glass balconies. A flagship construction project in Bhopal showcasing international standards. Every detail — from the structural planning to the premium marble flooring and bespoke staircase — was executed with precision and care.',
    year: '2022',
    area: '4,500 sq ft',
    gallery: [
      '/images/horizon-villa-day.jpg',
      '/images/horizon-villa-night.jpg',
      '/images/marble-staircase.jpg',
      '/images/marble-kitchen.jpg',
      '/images/bedroom-wardrobe.jpg',
    ],
  },
  {
    id: 'project-blue-kitchen',
    title: 'Blue Heaven - Modular Kitchen Transformation',
    slug: 'modular-kitchen-before-after-bhopal',
    category: 'Renovation',
    loc: 'Gulmohar, Bhopal',
    img: '/images/blue-kitchen-renovation.jpg',
    desc: 'Complete kitchen renovation showcasing a stunning before-and-after transformation with modular light blue cabinetry and designer subway tiling. The space was reimagined from scratch — new layout, island unit, under-cabinet lighting, and a classic blue-and-white palette that gives the kitchen timeless character.',
    year: '2022',
    area: '320 sq ft',
    gallery: [
      '/images/blue-kitchen-renovation.jpg',
      '/images/blue-kitchen-before.jpg',
      '/images/modular-kitchen-unit.jpg',
      '/images/grey-wood-kitchen.jpg',
    ],
  },
  {
    id: 'project-one6ne',
    title: 'ONE 6NE - Commercial Landmark',
    slug: 'commercial-building-interior-design-bhopal',
    category: 'Commercial',
    loc: 'MP Nagar, Bhopal',
    img: '/images/one6ne-commercial-1.jpg',
    desc: 'Dynamic commercial building interior and exterior design featuring geometric facades and modern workspace planning. The iconic hexagonal facade and bold orange-black palette make this a landmark destination on one of Bhopal\'s busiest commercial corridors.',
    year: '2022',
    area: '12,000 sq ft',
    gallery: [
      '/images/one6ne-commercial-1.jpg',
      '/images/one6ne-commercial-2.jpg',
      '/images/one6ne-commercial-3.jpg',
      '/images/residential-exterior.jpg',
    ],
  },
  {
    id: 'project-regal',
    title: 'Regal Residences - Luxury Interiors',
    slug: 'luxury-home-interiors-false-ceiling-bhopal',
    category: 'Residential',
    loc: 'Koh-e-Fiza, Bhopal',
    img: '/images/living-room-partition.jpg',
    desc: 'Sophisticated residential interiors featuring premium wardrobes, designer false ceilings, and bespoke mirrored partitions. The living space is anchored by a stunning diamond-mirror accent wall that doubles as a room divider, creating distinct zones while keeping the layout open and airy.',
    year: '2022',
    area: '2,800 sq ft',
    gallery: [
      '/images/living-room-partition.jpg',
      '/images/bedroom-wardrobe.jpg',
      '/images/residential-hallway.jpg',
      '/images/false-ceiling-render.jpg',
    ],
  },
  {
    id: 'project-sleek-kitchen',
    title: 'Sleek Kitchen - Grey & Wood Finish',
    slug: 'modern-kitchen-designer-bhopal',
    category: 'Residential',
    loc: 'Indore Highway, Bhopal',
    img: '/images/grey-wood-kitchen.jpg',
    desc: 'Real completion of a gourmet kitchen with sleek grey and wood finishes, black granite countertops, and a statement island with wood cladding. The warm walnut upper cabinets contrast beautifully against the matte grey lower units, while under-cabinet LED strips add depth and function.',
    year: '2022',
    area: '280 sq ft',
    gallery: [
      '/images/grey-wood-kitchen.jpg',
      '/images/grey-wood-kitchen-2.jpg',
      '/images/marble-kitchen.jpg',
      '/images/modular-kitchen-unit.jpg',
    ],
  },
];
