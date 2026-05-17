import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Footer() {
  const { phone, email, address, socialLinks } = useSiteSettings();

  return (
    <footer className="bg-stone-950 pt-20 pb-10 text-stone-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-14 items-center justify-center bg-white text-stone-950 font-bold text-lg">
                AIW
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none tracking-tighter text-white">
                  APKA INTERIOR
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                  WALA
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Bhopal's premier international interior design and construction agency. Providing affordable and best interior solutions in India.
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Our Projects</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">Design Journal</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Services</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Residential Interior</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Commercial Interior</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Turnkey Solutions</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Construction Services</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Renovation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-stone-600" />
                <span>{address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="shrink-0 text-stone-600" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="shrink-0 text-stone-600" />
                <span>{email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-medium uppercase tracking-widest">
          <p>© 2026 Apka Interior Wala – All Rights Reserved</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
