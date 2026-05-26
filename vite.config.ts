import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

const DOMAIN = 'https://apkainteriorwala.com';

// Static routes with their SEO metadata for pre-rendering
const routes: { path: string; title: string; description: string }[] = [
  {
    path: '',
    title: 'Apka Interior Wala | Interior Design & Construction Bhopal',
    description: 'Premium interior design and construction firm in Bhopal. Modular kitchens, false ceilings, custom furniture & turnkey solutions. Free consultation available.',
  },
  {
    path: '/about',
    title: 'About Us | Apka Interior Wala Bhopal',
    description: 'Learn about Apka Interior Wala — Bhopal\'s premier interior design and construction firm. Meet our founder and discover our journey of excellence.',
  },
  {
    path: '/services',
    title: 'Our Services | Interior Design & Construction Bhopal',
    description: 'Residential & commercial interior design, modular kitchens, false ceilings, construction, renovation, and turnkey solutions in Bhopal, Madhya Pradesh.',
  },
  {
    path: '/projects',
    title: 'Portfolio | Best Interior Designer in Bhopal & Indore',
    description: 'Explore our portfolio of luxury residential and commercial interior design projects across Bhopal and Madhya Pradesh.',
  },
  {
    path: '/journal',
    title: 'Design Journal | Interior Design Tips & Ideas Bhopal',
    description: 'Expert interior design tips, modular kitchen guides, false ceiling costs, and construction advice from Apka Interior Wala, Bhopal.',
  },
  {
    path: '/testimonials',
    title: 'Client Reviews | Apka Interior Wala Bhopal',
    description: 'Read what our clients say about Apka Interior Wala — Bhopal\'s most trusted interior design and construction firm.',
  },
  {
    path: '/contact',
    title: 'Contact Us | Apka Interior Wala Bhopal',
    description: 'Get in touch with Apka Interior Wala for a free interior design consultation in Bhopal. Call +91 78933 65987 or visit us at Patwa Market.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Apka Interior Wala Bhopal',
    description: 'Privacy Policy of Apka Interior Wala, Bhopal. Learn how we collect, use, and protect your personal information.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Apka Interior Wala Bhopal',
    description: 'Terms of Service for Apka Interior Wala, Bhopal. Read the terms governing use of our website and interior design & construction services.',
  },
];

function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function injectIntoShell(template: string, opts: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  extraHead?: string;
}): string {
  const { title, description, canonical, ogImage, ogType = 'website', extraHead = '' } = opts;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`);

  // Replace multiline meta description
  html = html.replace(/<meta[\s\S]*?name="description"[\s\S]*?\/>/s,
    `<meta name="description" content="${escAttr(description)}" />`
  );

  const injected = [
    `  <link rel="canonical" href="${canonical}" />`,
    `  <meta property="og:title" content="${escAttr(title)}" />`,
    `  <meta property="og:description" content="${escAttr(description)}" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:type" content="${ogType}" />`,
    ogImage ? `  <meta property="og:image" content="${ogImage}" />` : '',
    extraHead,
    `</head>`,
  ].filter(Boolean).join('\n');

  html = html.replace('</head>', injected);
  return html;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'build-seo-assets',
        async closeBundle() {
          const distDir = path.resolve(process.cwd(), 'dist');
          const today = new Date().toISOString().split('T')[0];
          const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

          // ── 1. Pre-render static HTML shells ─────────────────────────────
          for (const { path: routePath, title, description } of routes) {
            if (routePath === '') continue;
            const canonical = `${DOMAIN}${routePath}`;
            const isYearly = routePath === '/privacy' || routePath === '/terms';
            const html = injectIntoShell(template, { title, description, canonical });
            const dir = path.join(distDir, routePath);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
            void isYearly; // used in sitemap below
          }
          console.log(`✅ Pre-rendered ${routes.length - 1} static HTML shells`);

          // ── 2. Base sitemap URLs ──────────────────────────────────────────
          const sitemapUrls: { loc: string; lastmod: string; changefreq: string; priority?: string }[] = routes.map(r => ({
            loc: `${DOMAIN}${r.path}`,
            lastmod: today,
            changefreq: (r.path === '/privacy' || r.path === '/terms') ? 'yearly' : 'weekly',
          }));

          // ── 3. Firebase: pre-render dynamic project & journal shells ──────
          try {
            const firebaseConfig: Record<string, string> = JSON.parse(
              fs.readFileSync(path.resolve(process.cwd(), 'firebase-applet-config.json'), 'utf8')
            );

            const { initializeApp, getApps } = await import('firebase/app');
            const { getFirestore, collection, getDocs } = await import('firebase/firestore');

            const existingApp = getApps().find(a => a.name === 'prerender');
            const fbApp = existingApp ?? initializeApp(firebaseConfig, 'prerender');
            const db = getFirestore(fbApp, firebaseConfig.firestoreDatabaseId);

            const [projectsSnap, blogSnap] = await Promise.all([
              getDocs(collection(db, 'projects')),
              getDocs(collection(db, 'blog')),
            ]);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const projects: any[] = projectsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const posts: any[] = blogSnap.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .filter((p: any) => p.published !== false);

            // Project detail shells
            for (const project of projects) {
              if (!project.slug) continue;
              const canonical = `${DOMAIN}/projects/${project.slug}`;
              const location = project.location || 'Bhopal';
              const category = (project.category || 'interior design').toLowerCase();
              const title = `${project.title} | Interior Designer ${location} | Apka Interior Wala`;
              const rawDesc = (project.description || '') as string;
              const description = `${rawDesc.slice(0, 120).trimEnd()}… See this ${category} project by Apka Interior Wala in ${location}.`;

              const schema = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: project.title,
                description: project.description,
                image: project.image,
                locationCreated: {
                  '@type': 'Place',
                  name: location,
                  address: { '@type': 'PostalAddress', addressLocality: location, addressRegion: 'Madhya Pradesh', addressCountry: 'IN' },
                },
                creator: { '@type': 'LocalBusiness', name: 'Apka Interior Wala', url: DOMAIN },
              });

              const html = injectIntoShell(template, {
                title,
                description,
                canonical,
                ogImage: project.image,
                extraHead: `  <script type="application/ld+json">${schema}</script>`,
              });

              const dir = path.join(distDir, 'projects', project.slug);
              fs.mkdirSync(dir, { recursive: true });
              fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

              const rawDate = project.createdAt as string | undefined;
              sitemapUrls.push({
                loc: canonical,
                lastmod: rawDate ? rawDate.split('T')[0] : today,
                changefreq: 'monthly',
                priority: '0.8',
              });
            }
            console.log(`✅ Pre-rendered ${projects.length} project detail shells`);

            // Journal post shells
            for (const post of posts) {
              if (!post.slug) continue;
              const canonical = `${DOMAIN}/journal/${post.slug}`;
              const title = `${post.title} | Apka Interior Wala Journal`;
              const description = ((post.excerpt || post.content || '') as string).slice(0, 155).trimEnd();

              const schema = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: post.title,
                description: post.excerpt,
                image: post.image,
                datePublished: post.publishedAt,
                author: { '@type': 'Person', name: post.author || 'Apka Interior Wala' },
                publisher: {
                  '@type': 'Organization',
                  name: 'Apka Interior Wala',
                  logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.png` },
                },
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
              });

              const html = injectIntoShell(template, {
                title,
                description,
                canonical,
                ogImage: post.image,
                ogType: 'article',
                extraHead: `  <script type="application/ld+json">${schema}</script>`,
              });

              const dir = path.join(distDir, 'journal', post.slug);
              fs.mkdirSync(dir, { recursive: true });
              fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

              const rawDate = post.publishedAt as string | undefined;
              sitemapUrls.push({
                loc: canonical,
                lastmod: rawDate ? rawDate.split('T')[0] : today,
                changefreq: 'monthly',
                priority: '0.7',
              });
            }
            console.log(`✅ Pre-rendered ${posts.length} journal post shells`);

          } catch (err) {
            console.warn('⚠️  Firebase fetch skipped during build (dynamic shells not generated):', (err as Error).message);
          }

          // ── 4. Write sitemap.xml ──────────────────────────────────────────
          let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
          xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
          for (const { loc, lastmod, changefreq, priority } of sitemapUrls) {
            xml += '  <url>\n';
            xml += `    <loc>${loc}</loc>\n`;
            xml += `    <lastmod>${lastmod}</lastmod>\n`;
            xml += `    <changefreq>${changefreq}</changefreq>\n`;
            if (priority) xml += `    <priority>${priority}</priority>\n`;
            xml += '  </url>\n';
          }
          xml += '</urlset>';

          // ── 5. Write robots.txt ───────────────────────────────────────────
          const robots = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${DOMAIN}/sitemap.xml`;

          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
          fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
          console.log(`✅ sitemap.xml written with ${sitemapUrls.length} URLs (${sitemapUrls.length - routes.length} dynamic)\n`);
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
            'vendor-motion': ['motion/react'],
            'vendor-ui': ['sonner', 'react-helmet-async', 'lucide-react', '@hookform/resolvers', 'react-hook-form', 'zod'],
            'vendor-markdown': ['react-markdown'],
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
