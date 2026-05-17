import { motion } from 'motion/react';
import {
  Briefcase,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Users,
  ArrowUpRight,
  Settings,
  Database
} from 'lucide-react';
import { useFirestore } from '../../hooks/useFirestore';
import { Service, Project, BlogPost, ContactMessage } from '../../types';
import { Link } from 'react-router-dom';
import { seedDatabase } from '../../lib/seed';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

export default function AdminDashboard() {
  const { data: services } = useFirestore<Service>('services');
  const { data: projects } = useFirestore<Project>('projects');
  const { data: blogPosts } = useFirestore<BlogPost>('blog');
  const { data: messages } = useFirestore<ContactMessage>('messages');

  const handleSeed = async () => {
    if (window.confirm('This will populate the database with initial content. Continue?')) {
      try {
        await seedDatabase();
        toast.success('Database seeded successfully! Please refresh the page.');
      } catch (error) {
        toast.error('Failed to seed database');
      }
    }
  };

  const stats = [
    { name: 'Total Projects', value: projects.length, icon: ImageIcon, color: 'bg-blue-500' },
    { name: 'Services Offered', value: services.length, icon: Briefcase, color: 'bg-indigo-500' },
    { name: 'Blog Posts', value: blogPosts.length, icon: FileText, color: 'bg-amber-500' },
    { name: 'New Messages', value: messages.length, icon: MessageSquare, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Dashboard Overview</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Welcome to your CMS control center</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSeed}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-600 transition-colors"
          >
            <Database size={14} />
            <span>Seed Data</span>
          </button>
          <Link to="/" target="_blank" className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
            <span>View Live Site</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex items-center space-x-6"
          >
            <div className={cn('flex h-16 w-16 items-center justify-center rounded-2xl text-white', stat.color)}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{stat.name}</p>
              <h3 className="text-3xl font-bold text-stone-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-stone-900">Recent Messages</h2>
            <Link to="/admin/messages" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">View All</Link>
          </div>
          <div className="space-y-6">
            {messages.length === 0 ? (
              <p className="text-stone-400 text-sm italic">No messages yet</p>
            ) : (
              messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-stone-50 transition-colors">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <Users size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-stone-900">{msg.name}</h4>
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-stone-900 p-10 rounded-[2.5rem] shadow-sm text-white space-y-8">
          <h2 className="text-2xl font-light">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Add Project', path: '/admin/projects', icon: ImageIcon },
              { name: 'New Blog Post', path: '/admin/blog', icon: FileText },
              { name: 'Update Services', path: '/admin/services', icon: Briefcase },
              { name: 'Site Settings', path: '/admin/settings', icon: Settings },
            ].map((action, idx) => (
              <Link
                key={idx}
                to={action.path}
                className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all space-y-4 border border-white/5"
              >
                <action.icon size={24} className="text-stone-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

