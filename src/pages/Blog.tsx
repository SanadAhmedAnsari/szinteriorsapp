import { motion } from 'motion/react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Top 10 Interior Design Trends for 2026',
    excerpt: 'Discover the latest trends that are shaping the future of luxury living spaces, from sustainable materials to smart home integration.',
    category: 'Trends',
    author: 'Syed Zaid',
    date: 'March 15, 2026',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'How to Choose the Right Construction Partner',
    excerpt: 'Building your dream home is a huge commitment. Learn the key factors you should consider before hiring a construction agency.',
    category: 'Construction',
    author: 'Vikram Singh',
    date: 'March 10, 2026',
    img: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Space Optimization in Modern Apartments',
    excerpt: 'Living in a city like Bhopal often means making the most of limited space. Here are our expert tips for small space design.',
    category: 'Design Tips',
    author: 'Ananya Verma',
    date: 'March 05, 2026',
    img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Blog() {
  return (
    <div className="pt-32 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Latest News
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            Insights & <span className="italic font-serif">Inspiration</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col space-y-8"
            >
              <Link to={`/blog/${post.id}`} className="aspect-[16/10] overflow-hidden rounded-3xl">
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-900">{post.category}</span>
                  <span className="flex items-center space-x-1"><Calendar size={12} /> <span>{post.date}</span></span>
                </div>
                <h2 className="text-2xl font-light leading-tight text-stone-900 group-hover:text-stone-500 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:opacity-70 transition-opacity"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-40 bg-stone-50 rounded-[3rem] p-12 md:p-24 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-light text-stone-900">Subscribe to Our Newsletter</h2>
            <p className="text-stone-600">Get the latest design trends and construction tips delivered straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-white px-8 py-5 rounded-full border border-stone-200 focus:border-stone-900 focus:outline-none transition-all"
              />
              <button className="bg-stone-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
