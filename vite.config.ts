import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

const DOMAIN = 'https://apkainteriorwala.com';

const routes: { path: string; title: string; description: string }[] = [
  {
    path: '',
    title: 'Apka Interior Wala | Interior Design & Construction Bhopal',
    description: 'Premium interior design and construction firm in Bhopal. Modular kitchens, false ceilings, custom furniture & turnkey solutions. Free consultation available.',
  },
  {
    path: '/about',
    title: 'About Us | Apka Interior Wala Bhopal',
    description: "Learn about Apka Interior Wala — Bhopal's premier interior design and construction firm. Meet our founder and discover our journey of excellence.",
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
    description: "Read what our clients say about Apka Interior Wala — Bhopal's most trusted interior design and construction firm.",
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

// Static project and blog data for build-time pre-rendering
const staticProjects = [
  { slug: 'modern-luxury-villa-construction-bhopal', title: 'The Horizon - Modern Luxury Villa', category: 'Construction', location: 'Arera Colony, Bhopal', image: '/images/horizon-villa-day.jpg', description: 'Breathtaking multi-story villa construction with stone cladding and glass balconies. A flagship construction project in Bhopal showcasing international standards.', createdAt: '2022-08-01T00:00:00.000Z' },
  { slug: 'modular-kitchen-before-after-bhopal', title: 'Blue Heaven - Modular Kitchen Transformation', category: 'Renovation', location: 'Gulmohar, Bhopal', image: '/images/blue-kitchen-renovation.jpg', description: 'Complete kitchen renovation showcasing a stunning before-and-after transformation with modular light blue cabinetry and designer subway tiling.', createdAt: '2022-07-15T00:00:00.000Z' },
  { slug: 'commercial-building-interior-design-bhopal', title: 'ONE 6NE - Commercial Landmark', category: 'Commercial', location: 'MP Nagar, Bhopal', image: '/images/one6ne-commercial-1.jpg', description: "Dynamic commercial building interior and exterior design featuring geometric facades and modern workspace planning.", createdAt: '2022-06-10T00:00:00.000Z' },
  { slug: 'luxury-home-interiors-false-ceiling-bhopal', title: 'Regal Residences - Luxury Interiors', category: 'Residential', location: 'Koh-e-Fiza, Bhopal', image: '/images/living-room-partition.jpg', description: 'Sophisticated residential interiors featuring premium wardrobes, designer false ceilings, and bespoke mirrored partitions.', createdAt: '2022-05-20T00:00:00.000Z' },
  { slug: 'modern-kitchen-designer-bhopal', title: 'Sleek Kitchen - Grey & Wood Finish', category: 'Residential', location: 'Indore Highway, Bhopal', image: '/images/grey-wood-kitchen.jpg', description: 'Real completion of a gourmet kitchen with sleek grey and wood finishes, black granite countertops, and a statement island with wood cladding.', createdAt: '2022-04-05T00:00:00.000Z' },
];

const staticPosts = [
  { slug: 'best-interior-designer-bhopal-apka-interior-wala', title: 'Best Interior Designer in Bhopal: Why Apka Interior Wala Tops Every List', excerpt: "Looking for the best interior designer in Bhopal? Discover why Apka Interior Wala is Madhya Pradesh's most trusted interior design studio.", image: '/images/living-room-partition.jpg', publishedAt: '2023-06-01T00:00:00.000Z' },
  { slug: '10-tips-modern-modular-kitchen-bhopal', title: 'Modular Kitchen in Bhopal: Complete Guide to Cost, Design & Materials', excerpt: 'Planning a modular kitchen in Bhopal? This complete guide covers design styles, material choices, cost ranges, and planning tips.', image: '/images/grey-wood-kitchen.jpg', publishedAt: '2023-05-01T00:00:00.000Z' },
  { slug: 'false-ceiling-design-cost-bhopal', title: 'False Ceiling in Bhopal: Types, Designs & Real Cost Breakdown (2024)', excerpt: 'False ceilings can completely transform a room. This guide covers every material type with real cost ranges for Bhopal homes and offices.', image: '/images/false-ceiling-render.jpg', publishedAt: '2023-04-01T00:00:00.000Z' },
  { slug: 'best-construction-contractor-thekedar-bhopal', title: 'Best Construction Contractor in Bhopal: What to Look for Before You Hire', excerpt: 'Hiring a thekedar or construction contractor in Bhopal? This guide tells you exactly what to check before signing any agreement.', image: '/images/marble-staircase.jpg', publishedAt: '2023-03-01T00:00:00.000Z' },
  { slug: 'affordable-home-interior-design-bhopal-cost-guide', title: 'Affordable Interior Design in Bhopal: Real Cost Guide for Every Budget', excerpt: 'Wondering what interior design actually costs in Bhopal? This honest guide breaks down costs for every room, tier, and budget.', image: '/images/bedroom-wardrobe.jpg', publishedAt: '2023-02-01T00:00:00.000Z' },
  { slug: 'custom-furniture-carpentry-bhopal', title: "Custom Furniture in Bhopal: Why Bespoke Beats Off-the-Shelf Every Time", excerpt: "Custom furniture in Bhopal doesn't have to cost a fortune. Learn how bespoke wardrobes and kitchen cabinets can transform your home.", image: '/images/bedroom-wardrobe-study.jpg', publishedAt: '2023-01-01T00:00:00.000Z' },
  { slug: 'before-after-villa-renovation-bhopal', title: 'Before & After: Transforming a Dated Villa into a Luxury Home', excerpt: 'We take you behind the scenes of one of our most ambitious renovation projects — a 20-year-old villa in Arera Colony that became a modern luxury residence.', image: '/images/residential-hallway.jpg', publishedAt: '2022-07-20T00:00:00.000Z' },
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
  bodyContent?: string;
}): string {
  const { title, description, canonical, ogImage, ogType = 'website', extraHead = '', bodyContent } = opts;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`);
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

  // Inject crawlable body content so Google indexes real text on first HTML fetch
  if (bodyContent) {
    html = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${bodyContent}</div>`
    );
  }

  return html;
}

export default defineConfig(() => {
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
            const html = injectIntoShell(template, { title, description, canonical });
            const dir = path.join(distDir, routePath);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
          }
          console.log(`✅ Pre-rendered ${routes.length - 1} static HTML shells`);

          // ── 2. Base sitemap URLs ──────────────────────────────────────────
          const sitemapUrls: { loc: string; lastmod: string; changefreq: string; priority?: string }[] = routes.map(r => ({
            loc: `${DOMAIN}${r.path}`,
            lastmod: today,
            changefreq: (r.path === '/privacy' || r.path === '/terms') ? 'yearly' : 'weekly',
          }));

          // ── 3. Project detail shells ──────────────────────────────────────
          for (const project of staticProjects) {
            const canonical = `${DOMAIN}/projects/${project.slug}`;
            const location = project.location;
            const category = project.category.toLowerCase();
            const title = `${project.title} | Interior Designer ${location} | Apka Interior Wala`;
            const description = `${project.description.slice(0, 120).trimEnd()}… See this ${category} project by Apka Interior Wala in ${location}.`;

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

            const bodyContent = `<main style="max-width:860px;margin:0 auto;padding:2rem 1rem"><span style="font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:#78716c">${project.category} &mdash; ${location}</span><h1 style="font-size:2rem;font-weight:300;margin:.5rem 0 1rem;color:#1c1917">${project.title}</h1><p style="color:#57534e;line-height:1.7">${project.description}</p></main>`;

            const html = injectIntoShell(template, {
              title, description, canonical,
              ogImage: project.image,
              extraHead: `  <script type="application/ld+json">${schema}</script>`,
              bodyContent,
            });

            const dir = path.join(distDir, 'projects', project.slug);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

            sitemapUrls.push({
              loc: canonical,
              lastmod: project.createdAt.split('T')[0],
              changefreq: 'monthly',
              priority: '0.8',
            });
          }
          console.log(`✅ Pre-rendered ${staticProjects.length} project detail shells`);

          // ── 4. Journal post shells ────────────────────────────────────────
          for (const post of staticPosts) {
            const canonical = `${DOMAIN}/journal/${post.slug}`;
            const title = `${post.title} | Apka Interior Wala Journal`;
            const description = post.excerpt.slice(0, 155).trimEnd();

            const schema = JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.excerpt,
              image: post.image,
              datePublished: post.publishedAt,
              author: { '@type': 'Person', name: 'Zainab Khan' },
              publisher: {
                '@type': 'Organization',
                name: 'Apka Interior Wala',
                logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.png` },
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            });

            const bodyContent = `<main style="max-width:860px;margin:0 auto;padding:2rem 1rem"><h1 style="font-size:2rem;font-weight:300;margin:0 0 1rem;color:#1c1917">${post.title}</h1><p style="color:#57534e;line-height:1.7">${post.excerpt}</p></main>`;

            const html = injectIntoShell(template, {
              title, description, canonical,
              ogImage: post.image,
              ogType: 'article',
              extraHead: `  <script type="application/ld+json">${schema}</script>`,
              bodyContent,
            });

            const dir = path.join(distDir, 'journal', post.slug);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

            sitemapUrls.push({
              loc: canonical,
              lastmod: post.publishedAt.split('T')[0],
              changefreq: 'monthly',
              priority: '0.7',
            });
          }
          console.log(`✅ Pre-rendered ${staticPosts.length} journal post shells`);

          // ── 5. Write sitemap.xml ──────────────────────────────────────────
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

          // ── 6. Write robots.txt ───────────────────────────────────────────
          const robots = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${DOMAIN}/sitemap.xml`;

          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
          fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
          console.log(`✅ sitemap.xml written with ${sitemapUrls.length} URLs\n`);
        },
      },
    ],
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
