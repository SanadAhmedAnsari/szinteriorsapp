import { motion } from 'motion/react';
import { Home, Building, Key, Hammer, Paintbrush, Ruler, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Residential Interior Design',
    desc: 'Creating luxurious, personalized living spaces that reflect your unique style and personality. From modern apartments to classic villas.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1616486341351-7963a69f8222?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Commercial Interior Design',
    desc: 'Designing innovative and functional workspaces that boost productivity and reflect your brand identity. Offices, retail, and hospitality.',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Turnkey Interior Solutions',
    desc: 'End-to-end management of your interior project. We handle everything from design and procurement to installation and final styling.',
    icon: Key,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Construction Services',
    desc: 'High-quality civil construction with international standards. We build structures that are durable, sustainable, and aesthetically pleasing.',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Renovation & Remodeling',
    desc: 'Breathe new life into your existing spaces. We specialize in complete home and office transformations that add value and style.',
    icon: Paintbrush,
    image: 'https://images.unsplash.com/photo-1581850518616-bcb8188c4436?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Space Planning',
    desc: 'Optimizing your floor plan for maximum efficiency and flow. We ensure every square foot of your space is utilized effectively.',
    icon: Ruler,
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Project Management',
    desc: 'Professional oversight of your construction or interior project. We ensure quality, budget adherence, and timely delivery.',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Furniture & Custom Joinery',
    desc: 'Bespoke furniture and woodwork designed and crafted specifically for your space. Quality materials and exquisite finish.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f50126?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Services() {
  return (
    <div className="pb-32">
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
            Comprehensive <span className="italic font-serif">Solutions</span>
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
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow p-10 space-y-6">
                <div className="flex h-12 w-12 items-center justify-center bg-stone-900 text-white rounded-xl">
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

        {/* Process Section */}
        <div className="mt-40 bg-stone-900 rounded-[3rem] p-12 md:p-24 text-white">
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
