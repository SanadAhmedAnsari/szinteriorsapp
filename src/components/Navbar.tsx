import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Clock, Home as HomeIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Videos', path: '/videos' },
];

const socialLinks = [
  { icon: Instagram, url: '#' },
  { icon: Youtube, url: '#' },
  { icon: Linkedin, url: '#' },
  { icon: Facebook, url: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Top Header - Hides on scroll down */}
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white border-b border-stone-100 py-4"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center bg-stone-900 text-white font-bold text-2xl">
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

            {/* Info Items */}
            <div className="hidden lg:flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-900">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Call Us Now</span>
                  <span className="text-sm font-bold text-stone-900">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-900">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Opening times</span>
                  <span className="text-sm font-bold text-stone-900">Mon - Sat: 10 AM - 6 PM</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
              >
                Request a quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-stone-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation - Sticky */}
      <nav className="bg-stone-900/95 backdrop-blur-md text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-stone-300 transition-colors">
                <HomeIcon size={20} />
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-stone-300',
                      location.pathname === link.path ? 'text-white border-b border-white pb-1' : 'text-stone-400'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white hover:text-stone-900"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4 px-4 py-8">
              <Link to="/" className="text-lg font-bold uppercase tracking-widest text-stone-900">Home</Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-lg font-medium uppercase tracking-widest',
                    location.pathname === link.path ? 'text-stone-900' : 'text-stone-500'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex space-x-4">
                {socialLinks.map((social, i) => (
                  <a key={i} href={social.url} className="text-stone-400 hover:text-stone-900"><social.icon size={24} /></a>
                ))}
              </div>
              <Link
                to="/contact"
                className="mt-4 bg-stone-900 py-4 text-center text-sm font-bold uppercase tracking-widest text-white"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

