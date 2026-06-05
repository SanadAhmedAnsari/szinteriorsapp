import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollSEO } from '../hooks/useScrollSEO';
import { SEO_KEYWORDS } from '../utils/seoData';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data/projects';

const categories = ['All', 'Residential', 'Commercial', 'Construction', 'Renovation'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  useScrollSEO('.project-section');

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredProjects =
    activeCategory === 'All'
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="pb-32">
      <Helmet>
        <title>Portfolio | Best Interior Designer in Bhopal & Indore</title>
        <meta name="description" content="Explore our portfolio of luxury residential and commercial projects. Thekedar in Bhopal for Pinterest-inspired home designs." />
        <link rel="canonical" href="https://apkainteriorwala.com/projects" />
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
                  ? 'bg-primary text-white'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-32 text-center text-stone-400">No projects found.</div>
        ) : (
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
                  <div className="relative aspect-[4/5] overflow-hidden rounded-theme shadow-2xl">
                    <img
                      src={project.image}
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
                      <span className="text-xs font-bold uppercase tracking-widest">{project.location}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-lg text-stone-600 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {project.slug && (
                    <div className="pt-8">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="group inline-flex items-center space-x-4 text-xs font-bold uppercase tracking-[0.3em] text-stone-900"
                        aria-label={`View details for ${project.title}`}
                      >
                        <span className="border-b-2 border-stone-900 pb-1 group-hover:border-stone-400 transition-colors">Explore Project</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 group-hover:bg-primary group-hover:text-white transition-all">
                          <ExternalLink size={16} />
                        </div>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </section>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-40 relative overflow-hidden text-center bg-primary rounded-[4rem] p-20 md:p-32 text-white">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=50&w=1200"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-light mb-8">Ready to Build Your <span className="italic font-serif">Dream</span>?</h2>
            <p className="text-stone-400 mb-12 max-w-2xl mx-auto">
              Whether it's a Pinterest-inspired home design or a professional theka construction, we are your trusted partners in Madhya Pradesh.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-stone-900 px-16 py-6 text-sm font-bold uppercase tracking-widest transition-all hover:bg-stone-100 rounded-button"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
