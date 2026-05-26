import { motion, AnimatePresence } from 'motion/react';
import { useFirestore } from '../hooks/useFirestore';
import { BlogPost, VideoContent } from '../types';
import { Calendar, Play, ArrowRight, BookOpen, Video, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import VideoEmbed, { PlatformBadge } from '../components/VideoEmbed';

export default function Journal() {
  const { data: posts, loading: postsLoading } = useFirestore<BlogPost>('blog', []);
  const { data: videos, loading: videosLoading } = useFirestore<VideoContent>('videos', []);
  const [filter, setFilter] = useState<'all' | 'articles' | 'videos'>('all');
  const [activeVideo, setActiveVideo] = useState<VideoContent | null>(null);

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
        <link rel="canonical" href="https://apkainteriorwala.com/journal" />
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
                onClick={() => setFilter(f.id as typeof filter)}
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
                {/* Thumbnail */}
                <div
                  className={`relative overflow-hidden rounded-3xl bg-stone-100 ${
                    item.entryType === 'video' ? 'cursor-pointer' : ''
                  }`}
                  style={{ aspectRatio: '16/10' }}
                  onClick={() => item.entryType === 'video' && setActiveVideo(item as VideoContent)}
                >
                  <img
                    src={item.entryType === 'article' ? (item as BlogPost).image : (item as VideoContent).thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {item.entryType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white ring-2 ring-white/30 transition-transform group-hover:scale-110">
                        <Play size={26} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    {item.entryType === 'video' ? (
                      <PlatformBadge url={(item as VideoContent).videoUrl} />
                    ) : (
                      <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-900">
                        {(item as BlogPost).category}
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(
                          item.entryType === 'article'
                            ? (item as BlogPost).publishedAt
                            : (item as VideoContent).createdAt
                        ).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-2xl font-light leading-tight text-stone-900 group-hover:text-stone-500 transition-colors">
                    {item.entryType === 'video' ? (
                      <button
                        onClick={() => setActiveVideo(item as VideoContent)}
                        className="text-left"
                      >
                        {item.title}
                      </button>
                    ) : (
                      <Link to={`/journal/${item.slug}`}>{item.title}</Link>
                    )}
                  </h2>

                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {item.entryType === 'article'
                      ? (item as BlogPost).excerpt
                      : (item as VideoContent).description}
                  </p>

                  {item.entryType === 'video' ? (
                    <button
                      onClick={() => setActiveVideo(item as VideoContent)}
                      className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:opacity-70 transition-opacity"
                    >
                      <span>Watch Video</span>
                      <Play size={12} fill="currentColor" />
                    </button>
                  ) : (
                    <Link
                      to={`/journal/${item.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:opacity-70 transition-opacity"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <span>Close</span>
                <X size={18} />
              </button>

              {/* Title */}
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-white/50">
                {activeVideo.title}
              </p>

              <VideoEmbed url={activeVideo.videoUrl} title={activeVideo.title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
