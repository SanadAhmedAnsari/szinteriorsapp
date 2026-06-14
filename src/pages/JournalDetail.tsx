import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/blog';

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

export default function JournalDetail() {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/journal" replace />;

  const mins = readingTime(post.content);
  const canonical = `https://apkainteriorwala.com/journal/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Apka Interior Wala',
      logo: { '@type': 'ImageObject', url: 'https://apkainteriorwala.com/favicon.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    contentLocation: { '@type': 'Place', name: 'Bhopal, Madhya Pradesh, India' },
  };

  return (
    <div className="pb-32">
      <Helmet>
        <title>{post.title} | Apka Interior Wala Journal</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://apkainteriorwala.com' },
            { '@type': 'ListItem', position: 2, name: 'Journal', item: 'https://apkainteriorwala.com/journal' },
            { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
          ],
        })}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover brightness-[0.4]"
          fetchPriority="high"
          loading="eager"
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
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {mins} min read
            </span>
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
          className="mt-12"
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mt-12 mb-4 text-2xl font-light text-stone-900 border-b border-stone-100 pb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-3 text-lg font-semibold text-stone-800">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mt-5 text-lg leading-relaxed text-stone-700">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mt-5 space-y-2 pl-6 list-disc marker:text-stone-400">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mt-5 space-y-2 pl-6 list-decimal marker:text-stone-400">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-lg leading-relaxed text-stone-700">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-stone-900">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-8 border-l-4 border-stone-300 pl-6 italic text-stone-500">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
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
        <div className="mt-24 bg-primary rounded-theme p-12 text-center text-white">
          <h2 className="text-2xl font-light md:text-3xl">Ready to Transform Your Space?</h2>
          <p className="mt-4 text-stone-400 text-sm">
            Get a free consultation from Bhopal's premier interior design team.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-100 rounded-full"
            >
              Book a Free Consultation
            </Link>
            <Link
              to="/projects"
              className="inline-block border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 rounded-full"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
