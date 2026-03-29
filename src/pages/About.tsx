import { motion } from 'motion/react';
import { CheckCircle2, Award, Users, Target, Rocket } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';

const DEFAULT_ABOUT_CONTENT = {
  introTitle: 'Our Journey of Excellence',
  introText: 'Founded in Bhopal, SZ Interiors & Construction has grown into an international agency known for its commitment to quality and innovation.',
  mission: 'To transform our clients\' visions into reality through exceptional design and superior craftsmanship.',
  vision: 'To be the global leader in luxury interior design and sustainable construction solutions.',
};

export default function About() {
  const { content, loading } = usePageContent('about', DEFAULT_ABOUT_CONTENT);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-stone-900"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            Designing the <span className="italic font-serif">Future</span> of Bhopal
          </motion.h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-3xl font-light leading-tight text-stone-900 md:text-4xl">
              {content.introTitle}
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              {content.introText}
            </p>
            <p className="text-lg leading-relaxed text-stone-600">
              Our team of architects, interior designers, and engineers work in harmony to deliver turnkey solutions that are as functional as they are beautiful. From luxury villas in Arera Colony to modern corporate hubs in MP Nagar, our footprint is visible across Bhopal's skyline.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000"
                alt="Our Studio"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 mb-32">
          <div className="bg-stone-50 p-12 rounded-3xl space-y-6">
            <div className="h-12 w-12 bg-stone-900 text-white flex items-center justify-center rounded-xl">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Our Mission</h3>
            <p className="text-stone-600 leading-relaxed">
              {content.mission}
            </p>
          </div>
          <div className="bg-stone-900 p-12 rounded-3xl space-y-6 text-white">
            <div className="h-12 w-12 bg-white text-stone-900 flex items-center justify-center rounded-xl">
              <Rocket size={24} />
            </div>
            <h3 className="text-2xl font-bold">Our Vision</h3>
            <p className="text-stone-400 leading-relaxed">
              {content.vision}
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-stone-900">Why Choose SZ Interiors?</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: 'International Standards', desc: 'We bring global design trends and construction techniques to every project.' },
              { title: 'Turnkey Solutions', desc: 'From initial concept to the final handover, we manage everything for you.' },
              { title: 'Expert Team', desc: 'Our professionals are highly trained and passionate about creating excellence.' },
              { title: 'Quality Assurance', desc: 'We use only the finest materials and follow strict quality control protocols.' },
              { title: 'Timely Delivery', desc: 'We value your time and ensure all projects are completed within the agreed timeline.' },
              { title: 'Client Centric', desc: 'Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <CheckCircle2 size={24} className="text-stone-900 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-stone-900">{item.title}</h4>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section Placeholder */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">The People</span>
          <h2 className="mt-4 text-4xl font-light text-stone-900 mb-20">Our Leadership Team</h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Syed Zaid', role: 'Founder & Principal Architect', img: 'https://i.pravatar.cc/300?u=zaid' },
              { name: 'Ananya Verma', role: 'Head of Interior Design', img: 'https://i.pravatar.cc/300?u=ananya' },
              { name: 'Vikram Singh', role: 'Project Director', img: 'https://i.pravatar.cc/300?u=vikram' },
            ].map((member, idx) => (
              <div key={idx} className="space-y-6">
                <div className="aspect-square overflow-hidden rounded-3xl grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={member.img} alt={member.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-stone-900">{member.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-stone-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
