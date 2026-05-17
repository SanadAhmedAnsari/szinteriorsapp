import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Star, Quote, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { Service, Project, Testimonial, BlogPost } from '../types';
import { usePageContent } from '../hooks/usePageContent';

const DEFAULT_HOME_CONTENT = {
  heroTitle: 'Crafting Spaces That Tell Your Story',
  heroSubtitle: 'Premium interior design and construction services for residential and commercial projects in Bhopal and beyond.',
  heroImage: '/images/horizon-villa-day.jpg',
  aboutTitle: 'Excellence in Design & Construction',
  aboutText: 'With over a decade of experience, Apka Interior Wala has been at the forefront of creating luxury spaces that blend functionality with aesthetic brilliance.',
  aboutImage1: '/images/residential-hallway.jpg',
  aboutImage2: '/images/bedroom-render-2.png',
  ctaImage: '/images/horizon-villa-night.jpg',
};

export default function Home() {
  const { content, loading } = usePageContent('home', DEFAULT_HOME_CONTENT);
  const { data: services } = useFirestore<Service>('services');
  const { data: projects } = useFirestore<Project>('projects');
  const { data: testimonials } = useFirestore<Testimonial>('testimonials');
  const { data: blogPosts } = useFirestore<BlogPost>('blog');

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-stone-900"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content.heroImage}
            alt="Luxury Interior"
            className="h-full w-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center pt-32 md:pt-40">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.4em] text-stone-400"
            >
              Excellence in Design & Construction
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl"
            >
              {content.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-stone-300 md:text-xl"
            >
              {content.heroSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              <Link
                to="/projects"
                className="group flex items-center space-x-3 bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-100"
              >
                <span>View Portfolio</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="border border-white/30 bg-white/5 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="h-10 w-6 rounded-full border-2 border-white/20 flex justify-center p-1">
            <div className="h-2 w-1 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={content.aboutImage1}
                  alt="Best interior designer in Bhopal - Design Process"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden h-64 w-64 overflow-hidden rounded-2xl border-8 border-white shadow-2xl md:block">
                <img
                  src={content.aboutImage2}
                  alt="Construction contractor Madhya Pradesh - Site Work"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">About Apka Interior Wala</span>
              <h2 className="text-4xl font-light leading-tight text-stone-900 md:text-5xl">
                {content.aboutTitle}
              </h2>
              <p className="text-lg leading-relaxed text-stone-600">
                {content.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-3xl font-bold text-stone-900">150+</h4>
                  <p className="text-sm uppercase tracking-widest text-stone-500">Projects Completed</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-stone-900">12+</h4>
                  <p className="text-sm uppercase tracking-widest text-stone-500">Years Experience</p>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-stone-900 hover:opacity-70 transition-opacity"
              >
                <span>Learn More About Us</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">Our Expertise</span>
            <h2 className="mt-4 text-4xl font-light text-stone-900 md:text-5xl">Comprehensive <span className="italic font-serif">Solutions</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Residential Design', desc: 'Custom luxury interiors for villas and apartments. Pinterest-inspired home designs.', icon: 'Home' },
              { title: 'Commercial Design', desc: 'Innovative office and retail spaces that inspire. Modern office design Indore.', icon: 'Building' },
              { title: 'Construction', desc: 'High-quality construction with international standards. Thekedar in Bhopal.', icon: 'Hammer' },
              { title: 'Turnkey Solutions', desc: 'End-to-end management from concept to completion. Carpenter & Plumbing solutions.', icon: 'Key' },
            ].map((service, idx) => (
              <div key={idx} className="group border border-stone-100 p-10 transition-all hover:bg-stone-50 hover:shadow-xl">
                <div className="mb-8 flex h-16 w-16 items-center justify-center bg-stone-900 text-white transition-transform group-hover:scale-110">
                  <ChevronRight size={32} />
                </div>
                <h3 className="mb-4 text-xl font-bold text-stone-900">{service.title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-stone-600">{service.desc}</p>
                <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">Portfolio</span>
              <h2 className="mt-4 text-4xl font-light md:text-5xl">Featured Masterpieces</h2>
            </div>
            <Link to="/projects" className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/20 pb-2 hover:border-white transition-all">
              View All Projects
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {[
              { title: 'The Horizon Villa', loc: 'Arera Colony, Bhopal', img: '/images/horizon-villa-day.jpg', slug: 'interior-designer-in-bhopal-luxury-villa' },
              { title: 'ONE 6NE - Commercial Hub', loc: 'MP Nagar, Bhopal', img: '/images/one6ne-commercial-1.jpg', slug: 'modular-kitchen-bhopal-modern-design' },
            ].map((project, idx) => (
              <Link key={idx} to={`/projects/${project.slug}`} className="group block space-y-6">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.img}
                    alt={`${project.title} - False ceiling experts Bhopal`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-light tracking-tight">{project.title}</h3>
                  <p className="text-sm uppercase tracking-widest text-stone-500">{project.loc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">The Journal</span>
              <h2 className="mt-4 text-4xl font-light md:text-5xl">Design <span className="italic font-serif">Journal</span></h2>
            </div>
            <Link to="/journal" className="text-sm font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-2 hover:border-stone-900 transition-all">
              Explore Journal
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/journal/${post.slug}`} className="group block space-y-6">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{post.category}</span>
                  <h3 className="text-xl font-light leading-tight text-stone-900 group-hover:text-stone-500 transition-colors">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Quote size={64} className="mx-auto mb-12 text-stone-200" />
          <div className="space-y-12">
            <p className="text-2xl font-light italic leading-relaxed text-stone-800 md:text-3xl">
              "Apka Interior Wala transformed our house into a home that reflects our personality perfectly. Their attention to detail and commitment to quality is truly world-class."
            </p>
            <div>
              <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
                <img src="https://i.pravatar.cc/150?u=1" alt="Client" referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-lg font-bold text-stone-900">Rajesh Sharma</h4>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-500">Homeowner, Bhopal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-stone-900 px-8 py-24 text-center text-white rounded-3xl">
            <div className="absolute inset-0 opacity-20">
              <img
                src={content.ctaImage}
                alt="Construction"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-light md:text-5xl">Ready to Build Your Dream Space?</h2>
              <p className="text-lg text-stone-400">
                Contact us today for a free consultation and let's start creating something extraordinary together.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white px-12 py-5 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-100"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
