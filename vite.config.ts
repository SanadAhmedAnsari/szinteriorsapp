import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

const DOMAIN = 'https://apkainteriorwala.com';

const routes: { path: string; title: string; description: string }[] = [
  {
    path: '',
    title: 'Best Interior Designer in Bhopal | Apka Interior Wala',
    description: "Apka Interior Wala — Bhopal's best interior design studio. Modular kitchens, wardrobes, false ceilings, custom furniture & aluminium partitions. 150+ projects. Call +91 78933 65987 for a free consultation.",
  },
  {
    path: '/about',
    title: 'About Us | Apka Interior Wala Bhopal',
    description: "Learn about Apka Interior Wala — Bhopal's premier interior design and construction firm. Meet our founder and discover our journey of excellence.",
  },
  {
    path: '/services',
    title: 'Interior Design Services in Bhopal | Apka Interior Wala',
    description: 'Best interior design services in Bhopal — modular kitchens, wardrobes, false ceilings, aluminium partitions, custom furniture & turnkey construction. Call +91 78933 65987 for a free consultation.',
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
  { slug: 'wardrobe-design-bhopal-custom-modular', title: 'Wardrobe Design in Bhopal: Custom vs Modular, Cost & 2025 Ideas', excerpt: 'Planning a new wardrobe in Bhopal? This complete guide covers hinged vs sliding vs walk-in wardrobes, materials, internal layouts, and real cost estimates so you get it right the first time.', image: '/images/bedroom-wardrobe-study.jpg', publishedAt: '2026-04-01T00:00:00.000Z' },
  { slug: 'aluminium-profile-partition-fluted-glass-bhopal', title: 'Aluminium Profile Partition with Fluted Glass in Bhopal: Design, Cost & Ideas', excerpt: "Aluminium profile partitions with fluted glass are transforming Bhopal homes. This guide covers what they are, where to use them, frame finishes, glass types, and real costs for 2025.", image: '/images/living-room-partition.jpg', publishedAt: '2026-03-01T00:00:00.000Z' },
  { slug: 'bedroom-interior-design-bhopal-ideas-cost', title: 'Bedroom Interior Design in Bhopal: Ideas, Bed Designs & Real Costs (2025)', excerpt: 'Everything you need to plan your bedroom interior in Bhopal — bed designs, wardrobe tips, lighting, false ceiling, and a complete cost breakdown for every budget level.', image: '/images/bedroom-render.jpg', publishedAt: '2026-02-01T00:00:00.000Z' },
  { slug: 'tv-unit-design-bhopal-entertainment-wall', title: 'TV Unit Design in Bhopal: Wall-Mounted, Floating & Full Entertainment Walls', excerpt: 'A well-designed TV unit transforms your entire living room. This guide covers floor units, floating panels, full entertainment walls, backlit panels, cable management, and costs for Bhopal homes.', image: '/images/bedroom-render-2.jpg', publishedAt: '2026-01-01T00:00:00.000Z' },
  { slug: 'sofa-design-bhopal-living-room', title: 'Sofa Design in Bhopal: L-Shape, Sectional & Custom Sofas for Every Home', excerpt: "Planning a new sofa for your Bhopal home? This guide covers L-shape, sectional, and 3+1+1 configurations, the best fabrics for Bhopal's climate, sizing rules, and custom vs readymade costs.", image: '/images/residential-hallway.jpg', publishedAt: '2025-12-01T00:00:00.000Z' },
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
  // Match only the description <meta> tag itself — not other tags that come before it.
  // The multi-line form in index.html is: <meta\n      name="description"\n      content="..."\n    />
  html = html.replace(
    /<meta\s*\n\s*name="description"\s*\n\s*content="[^"]*"\s*\n\s*\/>/,
    `<meta name="description" content="${escAttr(description)}" />`
  );
  // Fallback for single-line: <meta name="description" content="..." />
  if (!html.includes(`content="${escAttr(description)}"`)) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escAttr(description)}" />`
    );
  }

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
          let template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

          // Inject CSS preload so the browser fetches the stylesheet before it's parsed
          const cssFile = fs.readdirSync(path.join(distDir, 'assets')).find(f => f.endsWith('.css'));
          if (cssFile) {
            template = template.replace(
              '</head>',
              `  <link rel="preload" as="style" href="/assets/${cssFile}" />\n</head>`
            );
            fs.writeFileSync(path.join(distDir, 'index.html'), template, 'utf8');
          }

          // ── 0. Inject homepage static FAQ body content ──
          const homepageFaqBody = `<section id="faq" style="max-width:800px;margin:4rem auto;padding:2rem 1rem"><h2 style="font-size:1.5rem;font-weight:300;margin:0 0 1.5rem;color:#1c1917">Frequently Asked Questions — Interior Design Bhopal</h2><div style="border-top:1px solid #e7e5e4"><div style="padding:1.25rem 0;border-bottom:1px solid #e7e5e4"><h3 style="font-size:1rem;font-weight:600;color:#1c1917;margin:0 0 .5rem">Who is the best interior designer in Bhopal?</h3><p style="color:#57534e;line-height:1.7;margin:0">Apka Interior Wala is widely regarded as Bhopal’s best interior design studio, with 150+ completed projects across residential and commercial segments throughout Madhya Pradesh.</p></div><div style="padding:1.25rem 0;border-bottom:1px solid #e7e5e4"><h3 style="font-size:1rem;font-weight:600;color:#1c1917;margin:0 0 .5rem">What interior design services are available in Bhopal?</h3><p style="color:#57534e;line-height:1.7;margin:0">Modular kitchens, custom wardrobes, false ceilings, custom furniture, aluminium sliding partitions, home &amp; wall decor, residential &amp; commercial interior design, and full turnkey construction across Bhopal.</p></div><div style="padding:1.25rem 0;border-bottom:1px solid #e7e5e4"><h3 style="font-size:1rem;font-weight:600;color:#1c1917;margin:0 0 .5rem">What is the cost of interior design in Bhopal?</h3><p style="color:#57534e;line-height:1.7;margin:0">Costs range from ₹50,000 for a single room to ₹8 lakh+ for full home interiors. Modular kitchens from ₹1.5 lakh, false ceilings from ₹60/sq ft, and 2BHK interiors from ₹5–8 lakh.</p></div><div style="padding:1.25rem 0;border-bottom:1px solid #e7e5e4"><h3 style="font-size:1rem;font-weight:600;color:#1c1917;margin:0 0 .5rem">Do you offer a free consultation in Bhopal?</h3><p style="color:#57534e;line-height:1.7;margin:0">Yes — free 60-minute consultation at our studio near Bharat Talkies, Bhopal, or at your site. Free 3D visualization before work begins.</p></div><div style="padding:1.25rem 0"><h3 style="font-size:1rem;font-weight:600;color:#1c1917;margin:0 0 .5rem">Which Bhopal areas do you serve?</h3><p style="color:#57534e;line-height:1.7;margin:0">Arera Colony, MP Nagar, Koh-e-Fiza, Gulmohar, Hoshangabad Road, New Market, Bhopal Junction, Shivaji Nagar, and surrounding Madhya Pradesh districts.</p></div></div></section>`;

          {
            let homepageHtml = template
              .replace('<div id="root"></div>', `<div id="root">${homepageFaqBody}</div>`);
            fs.writeFileSync(path.join(distDir, 'index.html'), homepageHtml, 'utf8');
          }
          // ── 1. Pre-render static HTML shells ─────────────────────────────
          for (const { path: routePath, title, description } of routes) {
            if (routePath === '') continue;
            const canonical = `${DOMAIN}${routePath}`;
            const html = injectIntoShell(template, { title, description, canonical });
            const dir = path.join(distDir, routePath);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
          }

          // ── 2. Base sitemap URLs ──────────────────────────────────────────
          const sitemapUrls: { loc: string; lastmod: string; changefreq: string; priority?: string }[] = routes
            .filter(r => r.path !== '/privacy' && r.path !== '/terms')
            .map(r => ({
              loc: `${DOMAIN}${r.path}`,
              lastmod: today,
              changefreq: 'weekly',
            }));

          // ── 3. Project detail shells ──────────────────────────────────────
          for (const project of staticProjects) {
            const canonical = `${DOMAIN}/projects/${project.slug}`;
            const location = project.location;
            const category = project.category.toLowerCase();
            const title = `${project.title} | Interior Designer ${location} | Apka Interior Wala`;
            const description = `${project.description.slice(0, 120).trimEnd()}… See this ${category} project by Apka Interior Wala in ${location}.`;

            const bodyContent = `<main style="max-width:860px;margin:0 auto;padding:2rem 1rem"><span style="font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:#78716c">${project.category} &mdash; ${location}</span><h1 style="font-size:2rem;font-weight:300;margin:.5rem 0 1rem;color:#1c1917">${project.title}</h1><p style="color:#57534e;line-height:1.7">${project.description}</p></main>`;

            const html = injectIntoShell(template, {
              title, description, canonical,
              ogImage: project.image,
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

          // ── 4. Journal post shells ────────────────────────────────────────
          for (const post of staticPosts) {
            const canonical = `${DOMAIN}/journal/${post.slug}`;
            const title = `${post.title} | Apka Interior Wala Journal`;
            const description = post.excerpt.slice(0, 155).trimEnd();

            const bodyContent = `<main style="max-width:860px;margin:0 auto;padding:2rem 1rem"><h1 style="font-size:2rem;font-weight:300;margin:0 0 1rem;color:#1c1917">${post.title}</h1><p style="color:#57534e;line-height:1.7">${post.excerpt}</p></main>`;

            const html = injectIntoShell(template, {
              title, description, canonical,
              ogImage: post.image,
              ogType: 'article',
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
