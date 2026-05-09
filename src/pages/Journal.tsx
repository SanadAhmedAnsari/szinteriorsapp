import { motion } from 'motion/react';
import { useFirestore } from '../hooks/useFirestore';
import { BlogPost, VideoContent } from '../types';
import { Calendar, Play, ArrowRight, BookOpen, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Journal() {
  const { data: posts, loading: postsLoading } = useFirestore<BlogPost>('blog', []);
  const { data: videos, loading: videosLoading } = useFirestore<VideoContent>('videos', []);
  const [filter, setFilter] = useState<'all' | 'articles' | 'videos'>('all');

  const combinedItems = [
    ...posts.map(p => ({ ...p, entryType: 'article' as const })),
    ...videos.map(v => ({ ...v, entryType: 'video' as const }))
  ].sort((a, b) => {
    const dateA = a.entryType === 'article' ? (a as BlogPost).publishedAt : (a as VideoContent).createdAt;
    const dateB = b.entryType === 'article' ? (b as BlogPost).publishedAt : (b as VideoContent).createdAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const filteredItems = combinedItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'articles') return item.entryType === 'article';
    if (filter === 'videos') return item.entryType === 'video';
    return true;
  });

  return (
    <div className="pb-32">
      <Helmet>
        <title>Journal | Apka Interior Wala - Design Insights & Tutorials</title>
        <meta name="description" content="Explore our hybrid journal featuring Pinterest-inspired home designs, construction tips, and affordable interior design tutorials in Bhopal by Apka Interior Wala." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            The Hybrid Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            Insights & <span className="italic font-serif">Inspiration</span>
          </motion.h1>

          <div className="mt-12 flex items-center justify-center space-x-8">
            {[
              { id: 'all', label: 'All Entries', icon: BookOpen },
              { id: 'articles', label: 'Articles', icon: BookOpen },
              { id: 'videos', label: 'Videos', icon: Video },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f.id ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <f.icon size={14} />
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {(postsLoading || videosLoading) ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {filteredItems.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col space-y-8"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-100">
                  <img
                    src={item.entryType === 'article' ? (item as BlogPost).image : (item as VideoContent).thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {item.entryType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-900">
                      {item.entryType === 'article' ? (item as BlogPost).category : (item as VideoContent).type}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} /> 
                      <span>{new Date(item.entryType === 'article' ? (item as BlogPost).publishedAt : (item as VideoContent).createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-light leading-tight text-stone-900 group-hover:text-stone-500 transition-colors">
                    <Link to={item.entryType === 'article' ? `/journal/${item.slug}` : (item as VideoContent).videoUrl} target={item.entryType === 'video' ? '_blank' : '_self'}>
                      {item.title}
                    </Link>
                  </h2>
                  
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {item.entryType === 'article' ? (item as BlogPost).excerpt : (item as VideoContent).description}
                  </p>

                  <Link
                    to={item.entryType === 'article' ? `/journal/${item.slug}` : (item as VideoContent).videoUrl}
                    target={item.entryType === 'video' ? '_blank' : '_self'}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:opacity-70 transition-opacity"
                  >
                    <span>{item.entryType === 'article' ? 'Read Article' : 'Watch Video'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
