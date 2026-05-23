import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

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

const paths = routes.map((r) => r.path);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [
      react(), 
      tailwindcss(),
      // Native Inline Vite Plugin to write sitemap and robots.txt
      {
        name: 'inline-sitemap-generator',
        closeBundle() {
          console.log('\n🏁 Vite Hook: Executing Inline Sitemap Generator...');
          const distDir = path.resolve(process.cwd(), 'dist');
          const DOMAIN = 'https://apkainteriorwala.com';
          const today = new Date().toISOString().split('T')[0];

          // 1. Build out XML String
          let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
          xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
          paths.forEach(route => {
            xml += '  <url>\n';
            xml += `    <loc>${DOMAIN}${route}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '  </url>\n';
          });
          xml += '</urlset>';

          // 2. Build out Robots.txt
          const robots = `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml`;

          // 3. Write directly to the output folder
          try {
            if (!fs.existsSync(distDir)) {
              fs.mkdirSync(distDir, { recursive: true });
            }
            fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
            fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
            console.log('✅ Success: sitemap.xml and robots.txt written perfectly to /dist!\n');
          } catch (err) {
            console.error('❌ Error writing sitemap files:', err);
          }
        }
      },
      // Pre-render static HTML shells for each route so Googlebot
      // sees real titles and meta tags without executing JavaScript
      {
        name: 'prerender-html-shells',
        closeBundle() {
          const distDir = path.resolve(process.cwd(), 'dist');
          const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

          routes.forEach(({ path: routePath, title, description }) => {
            if (routePath === '') return; // root index.html already exists

            const canonical = `https://apkainteriorwala.com${routePath}`;
            let html = template
              .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
              .replace(
                /<meta name="description" content=".*?"\s*\/>/,
                `<meta name="description" content="${description}" />`
              );

            // Inject canonical — replace if exists, otherwise insert before </head>
            if (html.includes('rel="canonical"')) {
              html = html.replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${canonical}" />`);
            } else {
              html = html.replace('</head>', `  <link rel="canonical" href="${canonical}" />\n  </head>`);
            }

            const dir = path.join(distDir, routePath);
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
          });

          console.log(`✅ Pre-rendered ${routes.length - 1} HTML shells\n`);
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});