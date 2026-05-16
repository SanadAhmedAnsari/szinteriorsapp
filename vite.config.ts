import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

// Define your static page paths
const paths = [
  '',
  '/about',
  '/services',
  '/projects',
  '/journal',
  '/testimonials',
  '/contact'
];

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