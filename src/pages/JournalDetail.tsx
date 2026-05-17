import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useFirestore } from '../hooks/useFirestore';
import { BlogPost } from '../types';

export default function JournalDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: posts, loading } = useFirestore<BlogPost>('blog');

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-stone-900" />
      </div>
    );
  }

  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/journal" replace />;

  return (
    <div className="pb-32">
      <Helmet>
        <title>{post.title} | Apka Interior Wala Journal</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl space-y-4"
          >
            <span className="inline-block rounded-full bg-white/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
              {post.category}
            </span>
            <h1 className="text-3xl font-light leading-tight text-white md:text-5xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back + Meta */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link
            to="/journal"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Journal</span>
          </Link>

          <div className="flex flex-wrap gap-6 text-xs text-stone-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.tags?.length > 0 && (
              <span className="flex items-center gap-2">
                <Tag size={14} />
                {post.tags.join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-10 text-xl font-light leading-relaxed text-stone-500 italic border-l-2 border-stone-200 pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose-custom"
        >
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className="mt-6 text-lg leading-relaxed text-stone-700 whitespace-pre-line"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 bg-stone-900 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-2xl font-light md:text-3xl">Ready to Transform Your Space?</h2>
          <p className="mt-4 text-stone-400 text-sm">
            Get a free consultation from Bhopal's premier interior design team.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-100 rounded-full"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
