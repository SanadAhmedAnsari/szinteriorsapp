import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Tag, Calendar, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFirestore } from '../hooks/useFirestore';
import { Project } from '../types';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const { data: projects, loading } = useFirestore<Project>('projects');

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-primary" />
      </div>
    );
  }

  const project = projects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;

  const galleryImages = project.gallery?.length ? project.gallery : [project.image];

  const canonicalUrl = `https://apkainteriorwala.com/projects/${project.slug}`;
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    dateCreated: project.createdAt,
    locationCreated: {
      '@type': 'Place',
      name: project.location || 'Bhopal',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.location || 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
    },
    creator: {
      '@type': 'LocalBusiness',
      name: 'Apka Interior Wala',
      url: 'https://apkainteriorwala.com',
    },
  };

  return (
    <div className="pb-32">
      <Helmet>
        <title>{project.title} | Interior Designer {project.location} | Apka Interior Wala</title>
        <meta
          name="description"
          content={`${project.description.slice(0, 130).trimEnd()}… See this ${project.category.toLowerCase()} project by Apka Interior Wala in ${project.location}.`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${project.title} | Apka Interior Wala`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={project.image} />
        <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} - ${project.category} interior design in ${project.location}`}
          className="h-full w-full object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl space-y-4"
          >
            <span className="inline-block rounded-full bg-white/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
              {project.category}
            </span>
            <h1 className="text-4xl font-light leading-tight text-white md:text-6xl">
              {project.title}
            </h1>
            <div className="flex items-center space-x-2 text-stone-300">
              <MapPin size={14} />
              <span className="text-sm uppercase tracking-widest">{project.location}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back + Meta */}
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-wrap gap-8 text-sm">
            {project.createdAt && (
              <div className="flex items-center space-x-2 text-stone-600">
                <Calendar size={16} className="text-stone-400" />
                <span>{new Date(project.createdAt).getFullYear()}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-stone-600">
              <Tag size={16} className="text-stone-400" />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-600">
              <MapPin size={16} className="text-stone-400" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-3xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">
            About This Project
          </span>
          <p className="mt-6 text-xl font-light leading-relaxed text-stone-700">
            {project.description}
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="mt-24">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">
            Project Gallery
          </span>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`group cursor-pointer overflow-hidden rounded-2xl ${
                  idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img}
                  alt={`${project.title} - ${project.category} gallery image ${idx + 1}, ${project.location}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 bg-primary rounded-theme p-12 md:p-20 text-center text-white">
          <h2 className="text-3xl font-light md:text-4xl">Want a Similar Space?</h2>
          <p className="mt-4 text-stone-400">
            Let us bring the same quality and vision to your project.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-block bg-white px-12 py-5 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-100 rounded-full"
          >
            Start Your Project
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt={`${project.title} - ${project.category} project by Apka Interior Wala, ${project.location}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
          <button
            className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl font-light"
            onClick={() => setLightboxImg(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
