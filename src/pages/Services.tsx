import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Home, Building, Key, Hammer, Paintbrush, Ruler, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Residential Interior Design',
    desc: 'Creating luxurious, personalized living spaces that reflect your unique style and personality. From modern apartments to classic villas.',
    icon: Home,
    image: '/images/bedroom-render.jpg',
  },
  {
    title: 'Commercial Interior Design',
    desc: 'Designing innovative and functional workspaces that boost productivity and reflect your brand identity. Offices, retail, and hospitality.',
    icon: Building,
    image: '/images/one6ne-commercial-3.jpg',
  },
  {
    title: 'Turnkey Interior Solutions',
    desc: 'End-to-end management of your project, ensuring a stress-free experience from conception to handover.',
    icon: Key,
    image: '/images/marble-kitchen.jpg',
  },
  {
    title: 'Construction Services',
    desc: 'Professional construction management and execution for residential and commercial projects, maintaining high quality and safety.',
    icon: Hammer,
    image: '/images/marble-staircase.jpg',
  },
  {
    title: 'Renovation & Remodeling',
    desc: 'Giving new life to existing spaces through creative remodeling and high-quality renovation work.',
    icon: Paintbrush,
    image: '/images/blue-kitchen-renovation.jpg',
  },
  {
    title: 'Space Planning',
    desc: 'Optimizing your floor plan for maximum efficiency and flow. We ensure every square foot of your space is utilized effectively.',
    icon: Ruler,
    image: '/images/false-ceiling-render.jpg',
  },
  {
    title: 'Project Management',
    desc: 'Professional oversight of your construction or interior project. We ensure quality, budget adherence, and timely delivery.',
    icon: Briefcase,
    image: '/images/bedroom-wardrobe.jpg',
  },
  {
    title: 'Furniture & Custom Joinery',
    desc: 'Bespoke furniture and woodwork designed and crafted specifically for your space. Quality materials and exquisite finish.',
    icon: Users,
    image: '/images/bedroom-wardrobe-study.jpg',
  },
];

export default function Services() {
  return (
    <div className="pb-32">
      <Helmet>
        <title>Our Services | Interior Design &amp; Construction Bhopal</title>
        <meta name="description" content="Residential & commercial interior design, modular kitchens, false ceilings, construction, renovation, and turnkey solutions in Bhopal, Madhya Pradesh." />
        <link rel="canonical" href="https://apkainteriorwala.com/services" />
        <meta property="og:title" content="Our Services | Interior Design &amp; Construction Bhopal" />
        <meta property="og:description" content="Residential &amp; commercial interior design, modular kitchens, false ceilings, construction, renovation, and turnkey solutions in Bhopal, Madhya Pradesh." />
        <meta property="og:url" content="https://apkainteriorwala.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://apkainteriorwala.com/images/marble-kitchen.jpg" />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Our Expertise
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            Interior Design <span className="italic font-serif">Services</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-stone-50 overflow-hidden rounded-3xl transition-all hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} in Bhopal, Madhya Pradesh - Apka Interior Wala`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow p-10 space-y-6">
                <div className="flex h-12 w-12 items-center justify-center bg-primary text-white rounded-xl">
                  <service.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">{service.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {service.desc}
                </p>
                <Link
                  to="/contact"
                  className="inline-block text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-1 hover:border-stone-900 transition-all"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Link */}
        <div className="mt-20 mb-0 text-center">
          <p className="text-stone-500 mb-6">Want to see these services in action?</p>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-3 text-sm font-bold uppercase tracking-widest text-stone-900 border-b-2 border-stone-900 pb-1 hover:border-stone-400 transition-colors"
          >
            <span>Explore Our Project Portfolio</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Process Section */}
        <div className="mt-40 bg-primary rounded-theme p-12 md:p-24 text-white">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-light mb-8">Our Working Process</h2>
            <p className="text-stone-400">We follow a systematic approach to ensure every project is delivered with perfection.</p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {[
              { step: '01', title: 'Consultation', desc: 'Understanding your vision and requirements.' },
              { step: '02', title: 'Concept Design', desc: 'Creating initial sketches and mood boards.' },
              { step: '03', title: 'Execution', desc: 'Meticulous construction and installation.' },
              { step: '04', title: 'Handover', desc: 'Final walkthrough and project completion.' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-6 relative">
                <span className="text-6xl font-serif italic text-white/10 absolute -top-10 left-0">{item.step}</span>
                <h4 className="text-xl font-bold relative z-10">{item.title}</h4>
                <p className="text-sm text-stone-400 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
