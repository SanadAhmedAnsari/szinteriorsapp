import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'modern-luxury-villa-construction-bhopal',
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
    description:
      'Breathtaking multi-story villa construction with stone cladding and glass balconies. A flagship construction project in Bhopal showcasing international standards. Every detail — from the structural planning to the premium marble flooring and bespoke staircase — was executed with precision and care.',
    featured: true,
    createdAt: '2022-08-01T00:00:00.000Z',
  },
  {
    id: 'modular-kitchen-before-after-bhopal',
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
    description:
      'Complete kitchen renovation showcasing a stunning before-and-after transformation with modular light blue cabinetry and designer subway tiling. The space was reimagined from scratch — new layout, island unit, under-cabinet lighting, and a classic blue-and-white palette that gives the kitchen timeless character.',
    featured: false,
    createdAt: '2022-07-15T00:00:00.000Z',
  },
  {
    id: 'commercial-building-interior-design-bhopal',
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
    description:
      "Dynamic commercial building interior and exterior design featuring geometric facades and modern workspace planning. The iconic hexagonal facade and bold orange-black palette make this a landmark destination on one of Bhopal's busiest commercial corridors.",
    featured: true,
    createdAt: '2022-06-10T00:00:00.000Z',
  },
  {
    id: 'luxury-home-interiors-false-ceiling-bhopal',
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
    description:
      'Sophisticated residential interiors featuring premium wardrobes, designer false ceilings, and bespoke mirrored partitions. The living space is anchored by a stunning diamond-mirror accent wall that doubles as a room divider, creating distinct zones while keeping the layout open and airy.',
    featured: false,
    createdAt: '2022-05-20T00:00:00.000Z',
  },
  {
    id: 'modern-kitchen-designer-bhopal',
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
    description:
      'Real completion of a gourmet kitchen with sleek grey and wood finishes, black granite countertops, and a statement island with wood cladding. The warm walnut upper cabinets contrast beautifully against the matte grey lower units, while under-cabinet LED strips add depth and function.',
    featured: false,
    createdAt: '2022-04-05T00:00:00.000Z',
  },
];
