import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Save, Palette, Type, Layout, Square } from 'lucide-react';

export default function ThemeSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    primaryColor: '#1c1917',
    secondaryColor: '#a8a29e',
    accentColor: '#d4af37',
    fontFamily: 'Inter',
    borderRadius: '1.5rem',
    buttonStyle: 'sharp', // sharp, rounded, pill
  });

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const docRef = doc(db, 'settings', 'theme');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTheme({ ...theme, ...docSnap.data() });
        }
      } catch (error) {
        toast.error('Failed to load theme settings');
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'theme'), theme);
      toast.success('Theme settings updated');
    } catch (error) {
      toast.error('Failed to update theme settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <h1 className="text-4xl font-light text-stone-900">Theme & Style</h1>
        <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Customize the visual identity of your website</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Palette size={20} />
              <h2 className="text-lg font-bold tracking-tight">Color Palette</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Primary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                    className="h-10 w-10 cursor-pointer rounded-lg border-none bg-transparent"
                  />
                  <span className="text-xs font-mono text-stone-500 uppercase">{theme.primaryColor}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Secondary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                    className="h-10 w-10 cursor-pointer rounded-lg border-none bg-transparent"
                  />
                  <span className="text-xs font-mono text-stone-500 uppercase">{theme.secondaryColor}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Accent Color (Gold)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                    className="h-10 w-10 cursor-pointer rounded-lg border-none bg-transparent"
                  />
                  <span className="text-xs font-mono text-stone-500 uppercase">{theme.accentColor}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Type size={20} />
              <h2 className="text-lg font-bold tracking-tight">Typography</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Font Family</label>
                <select
                  value={theme.fontFamily}
                  onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors bg-transparent"
                >
                  <option value="Inter">Inter (Modern Sans)</option>
                  <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                  <option value="Montserrat">Montserrat (Geometric Sans)</option>
                  <option value="Cormorant Garamond">Cormorant Garamond (Luxury Serif)</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Layout size={20} />
              <h2 className="text-lg font-bold tracking-tight">Layout Elements</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Border Radius (Cards/Images)</label>
                <input
                  type="text"
                  value={theme.borderRadius}
                  onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. 1.5rem"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Button Style</label>
                <div className="grid grid-cols-3 gap-4">
                  {['sharp', 'rounded', 'pill'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setTheme({ ...theme, buttonStyle: style })}
                      className={cn(
                        "py-3 text-[10px] font-bold uppercase tracking-widest border transition-all",
                        theme.buttonStyle === style 
                          ? "bg-stone-900 text-white border-stone-900" 
                          : "bg-white text-stone-400 border-stone-200 hover:border-stone-900"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-stone-100 p-8 rounded-[2rem] space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500">Live Preview</h3>
            <div className="space-y-6">
              <div 
                className="bg-white p-6 shadow-sm flex items-center space-x-4"
                style={{ borderRadius: theme.borderRadius }}
              >
                <div className="h-12 w-12 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
                <div className="space-y-2 flex-grow">
                  <div className="h-2 w-3/4 bg-stone-200 rounded"></div>
                  <div className="h-2 w-1/2 bg-stone-100 rounded"></div>
                </div>
              </div>
              <button 
                className={cn(
                  "w-full py-4 text-xs font-bold uppercase tracking-widest text-white transition-all",
                  theme.buttonStyle === 'sharp' ? 'rounded-none' : theme.buttonStyle === 'rounded' ? 'rounded-xl' : 'rounded-full'
                )}
                style={{ backgroundColor: theme.primaryColor }}
              >
                Sample Button
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-stone-100">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-3 bg-stone-900 px-12 py-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50"
        >
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save Theme Settings'}</span>
        </button>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
