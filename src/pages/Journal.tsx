import { motion } from 'motion/react';
import { blogPosts } from '../data/blog';
import { BlogPost } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'feed-id'?: string },
        HTMLElement
      >;
    }
  }
}

const BEHOLD_FEED_ID = 'RwbVx7L1sUWbm2dIt9Rl';

export default function Journal() {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(s);
  }, []);

  return (
    <div className="pb-32">
      <Helmet>
        <title>Journal | Apka Interior Wala - Design Insights & Tutorials</title>
        <meta name="description" content="Interior design tips, modular kitchen guides, false ceiling costs & construction advice from Apka Interior Wala — Bhopal's top design studio." />
        <link rel="canonical" href="https://apkainteriorwala.com/journal" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Articles Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600"
          >
            The Journal
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col space-y-8"
            >
              <Link to={`/journal/${post.slug}`} className="block">
                <div className="relative overflow-hidden rounded-3xl bg-stone-100" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={(post as BlogPost).image}
                    alt={`${post.title} - interior design article by Apka Interior Wala Bhopal`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                  <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-900">
                    {(post as BlogPost).category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>
                      {new Date((post as BlogPost).publishedAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>

                <h2 className="text-2xl font-light leading-tight text-stone-900 group-hover:text-stone-500 transition-colors">
                  <Link to={`/journal/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                  {(post as BlogPost).excerpt}
                </p>

                <Link
                  to={`/journal/${post.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:opacity-70 transition-opacity"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Instagram Reels Feed */}
        <div className="mt-32">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-600">From Our Instagram</span>
            <h2 className="mt-4 text-4xl font-light text-stone-900 md:text-5xl">
              Latest <span className="italic font-serif">Reels</span>
            </h2>
            <p className="mt-4 text-stone-500 text-sm">
              Follow us{' '}
              <a
                href="https://www.instagram.com/apkainteriorwalabhopal/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-stone-900 hover:opacity-70 transition-opacity"
              >
                @apkainteriorwalabhopal
              </a>{' '}
              for daily design inspiration
            </p>
          </div>
          <behold-widget feed-id={BEHOLD_FEED_ID} />
          <div className="mt-10 text-center">
            <a
              href="https://www.instagram.com/apkainteriorwalabhopal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border border-stone-900 px-8 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
            >
              <span>Follow Us on Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
