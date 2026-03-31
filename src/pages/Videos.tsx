import { motion } from 'motion/react';
import { useFirestore } from '../hooks/useFirestore';
import { VideoContent } from '../types';
import { Play, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Videos() {
  const { data: videos, loading } = useFirestore<VideoContent>('videos', []);
  const [filter, setFilter] = useState<'all' | 'project' | 'tutorial'>('all');

  const filteredVideos = videos.filter(v => filter === 'all' || v.type === filter);

  return (
    <div className="pt-32 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Visual Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-6xl"
          >
            Project <span className="italic font-serif">Reels</span> & Tutorials
          </motion.h1>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            {(['all', 'project', 'tutorial'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {f}s
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => window.open(video.videoUrl, '_blank')}
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-stone-100">
                  <img
                    src={video.thumbnail || `https://picsum.photos/seed/${video.id}/800/1400`}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900">
                      {video.type}
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <h3 className="text-xl font-light text-stone-900">{video.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
