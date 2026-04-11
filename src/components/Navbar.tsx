import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Journal', path: '/journal' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: Instagram, url: '#' },
  { icon: Youtube, url: '#' },
  { icon: Linkedin, url: '#' },
  { icon: Facebook, url: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // if scroll down, hide the navbar
          setIsVisible(false);
        } else {
          // if scroll up, show the navbar
          setIsVisible(true);
        }
        // remember current page location to use next time
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={cn(
      "fixed top-0 left-0 z-50 w-full transition-transform duration-300",
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      {/* Top Utility Header (White) */}
      <div className="bg-white py-6 border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex h-12 w-12 items-center justify-center bg-stone-900 text-white font-bold text-2xl transition-transform group-hover:scale-105">
                SZ
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-none tracking-tighter text-stone-900">
                  SZ INTERIORS
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                  & CONSTRUCTION
                </span>
              </div>
            </Link>

            {/* Contact Info (Desktop) */}
            <div className="hidden md:flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 text-stone-900">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Call Us Now</p>
                  <p className="text-sm font-bold text-stone-900">+91 78933 65987</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 border-l border-stone-100 pl-12">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 text-stone-900">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Opening times</p>
                  <p className="text-sm font-bold text-stone-900">Mon - Sat: 10 AM - 6 PM</p>
                </div>
              </div>

              <Link
                to="/contact"
                className="bg-stone-900 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 rounded-sm"
              >
                Request a quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-900 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Old Style) */}
      <nav className="absolute top-full left-0 w-full bg-stone-900/60 py-4 text-white backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop Nav */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-stone-300',
                    location.pathname === link.path ? 'text-white border-b border-white pb-1' : 'text-stone-300'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} className="hover:text-white transition-colors">
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-stone-900 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 px-4 py-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'text-lg font-medium uppercase tracking-widest',
                      location.pathname === link.path ? 'text-white' : 'text-stone-500'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="bg-white py-4 text-center text-sm font-bold uppercase tracking-widest text-stone-900"
                >
                  Request a quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

