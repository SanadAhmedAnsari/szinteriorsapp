import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'sonner';
import { LayoutDashboard, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please ensure you have admin access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md space-y-12 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center bg-stone-900 text-white rounded-3xl shadow-2xl">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-light text-stone-900">Admin Dashboard</h1>
          <p className="text-stone-500 text-sm uppercase tracking-widest">Apka Interior Wala</p>
        </div>

        <div className="bg-white p-12 rounded-[2rem] shadow-xl space-y-8">
          <p className="text-stone-600 leading-relaxed">
            Please sign in with your authorized Google account to access the CMS and manage your website content.
          </p>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center space-x-4 bg-stone-900 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50"
          >
            <LogIn size={20} />
            <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
