import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <div className="pb-32">
      <Helmet>
        <title>Client Reviews | Apka Interior Wala Bhopal</title>
        <meta name="description" content="Read what our clients say about Apka Interior Wala — Bhopal's most trusted interior design and construction firm." />
        <link rel="canonical" href="https://apkainteriorwala.com/testimonials" />
        <meta property="og:title" content="Client Reviews | Apka Interior Wala Bhopal" />
        <meta property="og:description" content="Read what our clients say about Apka Interior Wala — Bhopal's most trusted interior design and construction firm." />
        <meta property="og:url" content="https://apkainteriorwala.com/testimonials" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://apkainteriorwala.com/images/living-room-partition.jpg" />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600"
          >
            Client Reviews
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            What Our Bhopal <span className="italic font-serif">Clients</span> Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-lg text-stone-500 leading-relaxed"
          >
            Over 200 homeowners, business owners, and developers across Bhopal and Madhya Pradesh have trusted Apka Interior Wala for residential interiors, modular kitchens, false ceilings, and full turnkey construction. Here's what they have to say.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-stone-50 p-12 rounded-3xl space-y-8 flex flex-col"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'fill-primary text-primary' : 'text-stone-200'}
                  />
                ))}
              </div>
              <Quote size={32} className="text-stone-200" />
              <p className="text-stone-600 leading-relaxed italic flex-grow">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-4 pt-8 border-t border-stone-100">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-stone-200 flex items-center justify-center">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-lg font-bold text-stone-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{testimonial.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-stone-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 relative overflow-hidden text-center bg-primary p-12 md:p-24 rounded-theme text-white">
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
            <h2 className="text-3xl font-light mb-8">Join Our List of Satisfied Clients</h2>
            <p className="text-stone-400 mb-12 max-w-2xl mx-auto">
              Experience the difference of working with Bhopal's premier design and construction agency.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-stone-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-stone-100 transition-all"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
