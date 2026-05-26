import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';

// Always-needed structural components
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import { SEO } from './components/SEO';

// Public pages — loaded on demand per route
const Home = lazy(() => import('./pages/Home'));
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

// Admin — never downloaded by regular visitors
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminMessages = lazy(() => import('./pages/Admin/Messages'));
const AdminSettings = lazy(() => import('./pages/Admin/Settings'));
const AdminServices = lazy(() => import('./pages/Admin/Services'));
const AdminProjects = lazy(() => import('./pages/Admin/Projects'));
const AdminBlog = lazy(() => import('./pages/Admin/Blog'));
const AdminTestimonials = lazy(() => import('./pages/Admin/Testimonials'));
const ThemeSettings = lazy(() => import('./pages/Admin/ThemeSettings'));
const SEOSettings = lazy(() => import('./pages/Admin/SEOSettings'));
const MediaLibrary = lazy(() => import('./pages/Admin/MediaLibrary'));
const PageEditor = lazy(() => import('./pages/Admin/PageEditor'));
const AdminVideos = lazy(() => import('./pages/Admin/Videos'));

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
                {/* Public Routes */}
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

                {/* Admin Routes */}
                <Route path="/admin/login" element={user ? <Navigate to="/admin" /> : <AdminLogin />} />
                <Route
                  path="/admin/*"
                  element={user ? <AdminLayout /> : <Navigate to="/admin/login" />}
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="theme" element={<ThemeSettings />} />
                  <Route path="seo" element={<SEOSettings />} />
                  <Route path="media" element={<MediaLibrary />} />
                  <Route path="pages" element={<PageEditor />} />
                  <Route path="videos" element={<AdminVideos />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
