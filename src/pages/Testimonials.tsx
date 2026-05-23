import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { Testimonial } from '../types';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    role: 'Homeowner, Arera Colony',
    content: 'Apka Interior Wala transformed our house into a home that reflects our personality perfectly. Their attention to detail and commitment to quality is truly world-class. We are extremely happy with the final result.',
    rating: 5,
    image: '',
  },
  {
    id: '2',
    name: 'Priya Gupta',
    role: 'CEO, Tech Hub MP Nagar',
    content: 'The office design provided by Apka Interior Wala has significantly boosted our team productivity. The space is modern, functional, and reflects our brand identity perfectly. Highly recommended for commercial projects.',
    rating: 5,
    image: '',
  },
  {
    id: '3',
    name: 'Amit Verma',
    role: 'Villa Owner, Gulmohar',
    content: 'From construction to interior design, Apka Interior Wala handled everything with professional excellence. Their turnkey solution saved us so much time and stress. The quality of materials used is exceptional.',
    rating: 5,
    image: '',
  },
  {
    id: '4',
    name: 'Sonal Jain',
    role: 'Retail Store Owner',
    content: 'Our retail store looks stunning, thanks to the creative vision of the Apka Interior Wala team. They understood our requirements and delivered a space that attracts customers and enhances the shopping experience.',
    rating: 4,
    image: '',
  },
  {
    id: '5',
    name: 'Vikram Malhotra',
    role: 'Apartment Owner, Hoshangabad Road',
    content: 'The renovation of our 3BHK apartment was handled with great care. The space optimization tips provided by their designers were game-changers. We now have more storage and a much more open feel.',
    rating: 5,
    image: '',
  },
  {
    id: '6',
    name: 'Deepika Singh',
    role: 'Interior Enthusiast',
    content: 'I have worked with several designers in the past, but the level of professionalism and creativity at Apka Interior Wala is unmatched in Bhopal. They truly bring international standards to local projects.',
    rating: 5,
    image: '',
  },
];

export default function Testimonials() {
  const { data: firestoreTestimonials, loading } = useFirestore<Testimonial>('testimonials');

  const testimonials = firestoreTestimonials.length > 0 ? firestoreTestimonials : FALLBACK_TESTIMONIALS;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Client Reviews
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            What Our <span className="italic font-serif">Clients</span> Say
          </motion.h1>
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
                    <span className="text-lg font-bold text-stone-500">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{testimonial.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center bg-primary p-12 md:p-24 rounded-theme text-white">
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
  );
}
