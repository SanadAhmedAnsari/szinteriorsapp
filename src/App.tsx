import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import { SEO } from './components/SEO';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Journal from './pages/Journal';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminMessages from './pages/Admin/Messages';
import AdminSettings from './pages/Admin/Settings';
import AdminServices from './pages/Admin/Services';
import AdminProjects from './pages/Admin/Projects';
import AdminBlog from './pages/Admin/Blog';
import AdminTestimonials from './pages/Admin/Testimonials';
import ThemeSettings from './pages/Admin/ThemeSettings';
import SEOSettings from './pages/Admin/SEOSettings';
import MediaLibrary from './pages/Admin/MediaLibrary';
import PageEditor from './pages/Admin/PageEditor';
import AdminVideos from './pages/Admin/Videos';

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
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <SEO />
          <Router>
            <Toaster position="top-center" richColors />
            <Routes>
              {/* Public Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<Journal />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
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
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
