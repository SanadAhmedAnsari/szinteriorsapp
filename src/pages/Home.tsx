import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeContent } from '../data/pageContent';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';
import { testimonials } from '../data/testimonials';

const faqItems = [
  {
    q: 'Who is the best interior designer in Bhopal?',
    a: "Apka Interior Wala is widely regarded as Bhopal's best interior design studio, with 150+ completed projects across residential and commercial segments throughout Madhya Pradesh.",
  },
  {
    q: 'What interior design services do you offer in Bhopal?',
    a: 'We offer modular kitchens, custom wardrobes, false ceilings, custom furniture, aluminium sliding partitions, home & wall decor, residential interior design, commercial interior design, and full turnkey construction across Bhopal.',
  },
  {
    q: 'What is the cost of interior design in Bhopal?',
    a: 'Costs range from ₹50,000 for a single room refresh to ₹8 lakh+ for full home interiors. Modular kitchens start at ₹1.5 lakh, false ceilings from ₹60/sq ft, and complete 2BHK interiors from ₹5–8 lakh depending on finish quality.',
  },
  {
    q: 'Do you offer a free interior design consultation in Bhopal?',
    a: 'Yes — Apka Interior Wala offers a free 60-minute design consultation at our studio near Bharat Talkies, Bhopal, or at your home or office. We also provide free 3D visualizations before any work begins.',
  },
  {
    q: 'Which areas in Bhopal does Apka Interior Wala serve?',
    a: 'We serve all Bhopal localities including Arera Colony, MP Nagar, Koh-e-Fiza, Gulmohar, Hoshangabad Road, New Market, Bhopal Junction, and Shivaji Nagar, plus surrounding Madhya Pradesh districts including Indore.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left gap-6"
        aria-expanded={open}
      >
        <span className="text-lg font-light text-stone-900">{q}</span>
        <ChevronRight
          size={20}
          className={`shrink-0 text-stone-400 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-stone-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

const featuredProjects = [
  { title: 'The Horizon Villa', loc: 'Arera Colony, Bhopal', img: '/images/horizon-villa-day.jpg', slug: 'modern-luxury-villa-construction-bhopal' },
  { title: 'ONE 6NE - Commercial Hub', loc: 'MP Nagar, Bhopal', img: '/images/one6ne-commercial-1.jpg', slug: 'commercial-building-interior-design-bhopal' },
];

export default function Home() {
  const testimonial = testimonials[0];

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Best Interior Designer in Bhopal | Apka Interior Wala</title>
        <meta name="description" content="Apka Interior Wala — Bhopal's best interior design studio. Modular kitchens, wardrobes, false ceilings, custom furniture & aluminium partitions. 150+ projects. Call +91 78933 65987 for a free consultation." />
        <link rel="canonical" href="https://apkainteriorwala.com" />
        <meta property="og:title" content="Best Interior Designer in Bhopal | Apka Interior Wala" />
        <meta property="og:description" content="Apka Interior Wala — Bhopal's best interior design studio. Modular kitchens, wardrobes, false ceilings, custom furniture & aluminium partitions. Free consultation." />
        <meta property="og:url" content="https://apkainteriorwala.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://apkainteriorwala.com/images/living-room-partition.jpg" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={homeContent.heroImage}
            alt="Luxury interior design living room - Apka Interior Wala Bhopal"
            className="h-full w-full object-cover brightness-[0.4]"
            fetchPriority="high"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center pt-20 md:pt-28">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.4em] text-stone-400"
            >
              Excellence in Design & Construction
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-5 text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl"
            >
              {homeContent.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-stone-300 md:text-xl"
            >
              {homeContent.heroSubtitle}
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
                  src={homeContent.aboutImage1}
                  alt="Best interior designer in Bhopal - Design Process"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden h-64 w-64 overflow-hidden rounded-2xl border-8 border-white shadow-2xl md:block">
                <img
                  src={homeContent.aboutImage2}
                  alt="Construction contractor Madhya Pradesh - Site Work"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600">About Apka Interior Wala</span>
              <h2 className="text-4xl font-light leading-tight text-stone-900 md:text-5xl">
                {homeContent.aboutTitle}
              </h2>
              <p className="text-lg leading-relaxed text-stone-600">
                {homeContent.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-stone-900">150+</p>
                  <p className="text-sm uppercase tracking-widest text-stone-600">Projects Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-stone-900">12+</p>
                  <p className="text-sm uppercase tracking-widest text-stone-600">Years Experience</p>
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
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600">Our Expertise</span>
            <h2 className="mt-4 text-4xl font-light text-stone-900 md:text-5xl">Comprehensive <span className="italic font-serif">Solutions</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Residential Design', desc: 'Custom luxury interiors for villas and apartments. Pinterest-inspired home designs.' },
              { title: 'Commercial Design', desc: 'Innovative office and retail spaces that inspire. Modern office design Indore.' },
              { title: 'Construction', desc: 'High-quality construction with international standards. Thekedar in Bhopal.' },
              { title: 'Turnkey Solutions', desc: 'End-to-end management from concept to completion. Carpenter & Plumbing solutions.' },
            ].map((service, idx) => (
              <div key={idx} className="group border border-stone-100 p-10 transition-all hover:bg-stone-50 hover:shadow-xl">
                <div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary text-white transition-transform group-hover:scale-110">
                  <ChevronRight size={32} />
                </div>
                <h3 className="mb-4 text-xl font-bold text-stone-900">{service.title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-stone-600">{service.desc}</p>
                <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-stone-600 group-hover:text-stone-900">
                  Read More<span className="sr-only"> about {service.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">Portfolio</span>
              <h2 className="mt-4 text-4xl font-light md:text-5xl">Featured Masterpieces</h2>
            </div>
            <Link to="/projects" className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/20 pb-2 hover:border-white transition-all">
              View All Projects
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {featuredProjects.map((project, idx) => (
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
                  <p className="text-sm uppercase tracking-widest text-stone-400">{project.loc}</p>
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
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600">The Journal</span>
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">{post.category}</span>
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
              "{testimonial.content}"
            </p>
            <div>
              <p className="text-lg font-bold text-stone-900">{testimonial.name}</p>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-600">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-stone-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600">Common Questions</span>
            <h2 className="mt-4 text-4xl font-light text-stone-900 md:text-5xl">
              Frequently Asked <span className="italic font-serif">Questions</span>
            </h2>
          </div>
          <div className="divide-y divide-stone-100 border-t border-stone-100">
            {faqItems.map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-primary px-8 py-24 text-center text-white rounded-theme">
            <div className="absolute inset-0 opacity-20">
              <img
                src={homeContent.ctaImage}
                alt="Construction and interior design work in progress - Apka Interior Wala Bhopal"
                className="h-full w-full object-cover"
                loading="lazy"
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
