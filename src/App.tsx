import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';

import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import { SEO } from './components/SEO';

import Home from './pages/Home';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    _gtmLoaded?: boolean;
  }
}

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Journal = lazy(() => import('./pages/Journal'));
const JournalDetail = lazy(() => import('./pages/JournalDetail'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-stone-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-primary" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const load = () => {
      if (window._gtmLoaded) return;
      window._gtmLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5Z7QMPWN&l=dataLayer';
      s.async = true;
      document.head.appendChild(s);
    };

    const timer = setTimeout(load, 3500);
    const events = ['click', 'scroll', 'keydown', 'touchstart'] as const;
    const onInteraction = () => { clearTimeout(timer); load(); };
    events.forEach(e => window.addEventListener(e, onInteraction, { once: true, passive: true }));

    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, onInteraction));
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <SEO />
            <ScrollToTop />
            <Toaster position="top-center" richColors />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:slug" element={<JournalDetail />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
