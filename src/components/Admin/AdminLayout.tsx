import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Star,
  Globe,
  Palette,
  Layout
} from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const adminLinks = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard },
  { name: 'Manage Pages', path: '/admin/pages', icon: Layout },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Projects', path: '/admin/projects', icon: ImageIcon },
  { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
  { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  { name: 'Theme & Style', path: '/admin/theme', icon: Palette },
  { name: 'SEO Settings', path: '/admin/seo', icon: Globe },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="flex h-screen bg-stone-50 font-sans text-stone-900">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-stone-900 text-white transition-transform duration-300 lg:static lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-8 py-10">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center bg-white text-stone-900 font-bold text-xl rounded-lg">
                SZ
              </div>
              <span className="text-lg font-bold tracking-tighter">ADMIN PANEL</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow space-y-1 px-4 overflow-y-auto">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center space-x-4 px-4 py-4 text-sm font-medium transition-all rounded-xl',
                  location.pathname === link.path
                    ? 'bg-white text-stone-900'
                    : 'text-stone-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-4 px-4 py-4 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all rounded-xl"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-grow flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between border-b border-stone-200 bg-white px-8">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Welcome Back, Admin</span>
            <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center">
              <Users size={20} className="text-stone-400" />
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
