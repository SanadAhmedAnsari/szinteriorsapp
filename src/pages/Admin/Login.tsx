import { useState, type FormEvent } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'sonner';
import { LayoutDashboard, LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'google' | 'email'>('email');

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully');
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Allow popups for this site, or use email/password below.', { duration: 8000 });
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error('This domain is not authorized in Firebase. Use email/password login instead.', { duration: 8000 });
      } else if (error.code !== 'auth/cancelled-by-user') {
        toast.error(error.message || 'Google login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        toast.error('Invalid email or password.');
      } else {
        toast.error(error.message || 'Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md space-y-10 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center bg-stone-900 text-white rounded-3xl shadow-2xl">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-light text-stone-900">Admin Dashboard</h1>
          <p className="text-stone-500 text-sm uppercase tracking-widest">Apka Interior Wala</p>
        </div>

        <div className="bg-white p-10 rounded-[2rem] shadow-xl space-y-8">
          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-stone-100">
            <button
              onClick={() => setMode('email')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                mode === 'email' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-900'
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setMode('google')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                mode === 'google' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-900'
              }`}
            >
              Google
            </button>
          </div>

          {mode === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-0 top-3.5 text-stone-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full border-b border-stone-200 pl-6 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-0 top-3.5 text-stone-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-b border-stone-200 pl-6 pr-8 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-3.5 text-stone-300 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center space-x-3 bg-stone-900 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50"
              >
                <LogIn size={20} />
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              </button>
              <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                Create your admin account first in Firebase Console →<br />
                Authentication → Users → Add user
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <p className="text-stone-600 text-sm leading-relaxed">
                Sign in with your authorized Google account. Make sure popups are allowed and <code className="bg-stone-100 px-1 rounded text-xs">localhost</code> is added to Firebase Auth authorized domains.
              </p>
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center space-x-4 bg-stone-900 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50"
              >
                <LogIn size={20} />
                <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>
            </div>
          )}
        </div>

        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
