import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Residential', 'Commercial', 'Construction', 'Renovation'];

const projects = [
  { id: 1, title: 'The Royal Villa', category: 'Residential', loc: 'Arera Colony, Bhopal', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Modern Office Hub', category: 'Commercial', loc: 'MP Nagar, Bhopal', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Luxury Penthouse', category: 'Residential', loc: 'Gulmohar, Bhopal', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Retail Emporium', category: 'Commercial', loc: 'DB Mall Area, Bhopal', img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Heritage Renovation', category: 'Renovation', loc: 'Old Bhopal', img: 'https://images.unsplash.com/photo-1581850518616-bcb8188c4436?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Sustainable Housing', category: 'Construction', loc: 'Hoshangabad Road, Bhopal', img: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-32">
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

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">{project.category}</span>
                  <h3 className="text-2xl font-light mb-4">{project.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-stone-500 mb-8">{project.loc}</p>
                  <Link to={`/projects/${project.id}`} className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-stone-300 transition-colors">
                    <span>View Project</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <p className="text-stone-500 mb-8">Have a specific project in mind?</p>
          <Link
            to="/contact"
            className="inline-block bg-stone-900 px-12 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
}
