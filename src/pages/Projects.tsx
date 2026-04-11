import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ExternalLink, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useScrollSEO } from '../hooks/useScrollSEO';
import { PROJECT_SLUGS, SEO_KEYWORDS } from '../utils/seoData';
import { Helmet } from 'react-helmet-async';

const categories = ['All', 'Residential', 'Commercial', 'Construction', 'Renovation'];

const projects = [
  { id: 'project-1', title: 'The Royal Villa', slug: 'interior-designer-in-bhopal-luxury-villa', category: 'Residential', loc: 'Arera Colony, Bhopal', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', desc: 'Best interior designer in Bhopal for luxury villas and high-end residential spaces.' },
  { id: 'project-2', title: 'Modern Office Hub', slug: 'modular-kitchen-bhopal-modern-design', category: 'Commercial', loc: 'MP Nagar, Bhopal', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', desc: 'Modular kitchen Bhopal experts delivering modern office hubs and commercial interiors.' },
  { id: 'project-3', title: 'Luxury Penthouse', slug: 'false-ceiling-experts-bhopal-office', category: 'Residential', loc: 'Gulmohar, Bhopal', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800', desc: 'False ceiling experts in Bhopal creating breathtaking luxury penthouses.' },
  { id: 'project-4', title: 'Retail Emporium', slug: 'construction-contractor-madhya-pradesh-residence', category: 'Commercial', loc: 'DB Mall Area, Bhopal', img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800', desc: 'Construction contractor Madhya Pradesh for retail emporiums and commercial spaces.' },
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
