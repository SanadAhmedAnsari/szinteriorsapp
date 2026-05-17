import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ExternalLink, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useScrollSEO } from '../hooks/useScrollSEO';
import { PROJECT_SLUGS, SEO_KEYWORDS } from '../utils/seoData';
import { Helmet } from 'react-helmet-async';

const categories = ['All', 'Residential', 'Commercial', 'Construction', 'Renovation'];

const projects = [
  {
    id: 'project-horizon',
    title: 'The Horizon - Modern Luxury Villa',
    slug: 'modern-luxury-villa-construction-bhopal',
    category: 'Construction',
    loc: 'Arera Colony, Bhopal',
    img: '/images/horizon-villa-day.jpg',
    desc: 'Breathtaking multi-story villa construction with stone cladding and glass balconies. A flagship construction project in Bhopal showcasing international standards.'
  },
  {
    id: 'project-blue-kitchen',
    title: 'Blue Heaven - Modular Kitchen Transformation',
    slug: 'modular-kitchen-before-after-bhopal',
    category: 'Renovation',
    loc: 'Gulmohar, Bhopal',
    img: '/images/blue-kitchen-renovation.jpg',
    desc: 'Complete kitchen renovation showcasing a stunning before-and-after transformation with modular light blue cabinetry and designer tiling.'
  },
  {
    id: 'project-one6ne',
    title: 'ONE 6NE - Commercial Landmark',
    slug: 'commercial-building-interior-design-bhopal',
    category: 'Commercial',
    loc: 'MP Nagar, Bhopal',
    img: '/images/one6ne-commercial-1.jpg',
    desc: 'Dynamic commercial building interior and exterior design featuring geometric facades and modern workspace planning.'
  },
  {
    id: 'project-regal',
    title: 'Regal Residences - Luxury Interiors',
    slug: 'luxury-home-interiors-false-ceiling-bhopal',
    category: 'Residential',
    loc: 'Koh-e-Fiza, Bhopal',
    img: '/images/living-room-partition.jpg',
    desc: 'Sophisticated residential interiors featuring premium wardrobes, designer false ceilings, and bespoke mirrored partitions.'
  },
  {
    id: 'project-sleek-kitchen',
    title: 'Sleek Kitchen - Grey & Wood Finish',
    slug: 'modern-kitchen-designer-bhopal',
    category: 'Residential',
    loc: 'Indore Highway, Bhopal',
    img: '/images/grey-wood-kitchen.jpg',
    desc: 'Real completion of a gourmet kitchen with sleek grey and wood finishes, marble flooring, and designer pendant lighting.'
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { slug } = useParams();
  
  // Vertical Scroll SEO Trick
  useScrollSEO('.project-section');

  // Scroll to project if slug is present in URL
  useEffect(() => {
    if (slug) {
      const element = document.getElementById(slug);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [slug]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pb-32">
      <Helmet>
        <title>Portfolio | Best Interior Designer in Bhopal & Indore</title>
        <meta name="description" content="Explore our portfolio of luxury residential and commercial projects. Thekedar in Bhopal for Pinterest-inspired home designs." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            Featured <span className="italic font-serif">Masterpieces</span>
          </motion.h1>
        </div>

        {/* Filter */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white' 
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Carousel for SEO & UX */}
        <div className="space-y-32">
          {filteredProjects.map((project, idx) => (
            <section 
              key={project.id} 
              id={project.slug}
              className="project-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]"
            >
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
                  <img
                    src={project.img}
                    alt={`${project.title} - ${SEO_KEYWORDS.colloquial[idx % SEO_KEYWORDS.colloquial.length]}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900">
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`space-y-8 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-stone-500">
                    <MapPin size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">{project.loc}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-lg text-stone-600 leading-relaxed font-light">
                  {project.desc}
                </p>

                <div className="pt-8">
                  <Link 
                    to={`/projects/${project.slug}`}
                    className="group inline-flex items-center space-x-4 text-xs font-bold uppercase tracking-[0.3em] text-stone-900"
                    aria-label={`View details for ${project.title} - ${SEO_KEYWORDS.primary[0]}`}
                  >
                    <span className="border-b-2 border-stone-900 pb-1 group-hover:border-stone-400 transition-colors">Explore Project</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-all">
                      <ExternalLink size={16} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-40 text-center bg-stone-50 rounded-[4rem] p-20 md:p-32">
          <h2 className="text-4xl font-light text-stone-900 mb-8">Ready to Build Your <span className="italic font-serif">Dream</span>?</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">
            Whether it's a Pinterest-inspired home design or a professional theka construction, we are your trusted partners in Madhya Pradesh.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-stone-900 px-16 py-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 rounded-full"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
}
