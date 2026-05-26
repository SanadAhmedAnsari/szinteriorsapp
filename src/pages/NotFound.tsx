import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <Helmet>
        <title>Page Not Found | Apka Interior Wala Bhopal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg space-y-8"
      >
        <span className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400">404</span>
        <h1 className="text-5xl font-light text-stone-900 md:text-6xl">
          Page <span className="italic font-serif">Not Found</span>
        </h1>
        <p className="text-lg text-stone-500 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back to designing beautiful spaces.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-block bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 rounded-full"
          >
            Back to Home
          </Link>
          <Link
            to="/projects"
            className="inline-block border border-stone-300 px-10 py-4 text-sm font-bold uppercase tracking-widest text-stone-700 transition-all hover:border-stone-900 rounded-full"
          >
            View Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
