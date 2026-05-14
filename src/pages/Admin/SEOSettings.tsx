import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Save, Globe, Search, Share2, Code } from 'lucide-react';

export default function SEOSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seo, setSeo] = useState({
    metaTitle: 'Apka Interior Wala | Best Interiors & Construction Bhopal',
    metaDescription: 'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, India, offering affordable luxury residential and commercial solutions.',
    keywords: 'best interior, interior design bhopal, construction agency india, luxury home interiors, commercial interior design, best company for interior',
    ogImage: '',
    googleAnalyticsId: '',
    searchConsoleId: '',
    robotsTxt: 'User-agent: *\nAllow: /',
  });

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, 'settings', 'seo');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSeo({ ...seo, ...docSnap.data() });
        }
      } catch (error) {
        toast.error('Failed to load SEO settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSEO();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'seo'), seo);
      toast.success('SEO settings updated');
    } catch (error) {
      toast.error('Failed to update SEO settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <h1 className="text-4xl font-light text-stone-900">SEO Settings</h1>
        <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Optimize your website for search engines and social sharing</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Search size={20} />
              <h2 className="text-lg font-bold tracking-tight">Meta Information</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Default Meta Title</label>
                <input
                  value={seo.metaTitle}
                  onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Default Meta Description</label>
                <textarea
                  value={seo.metaDescription}
                  onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                  rows={4}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Keywords (Comma separated)</label>
                <input
                  value={seo.keywords}
                  onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Code size={20} />
              <h2 className="text-lg font-bold tracking-tight">Analytics & Tracking</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Google Analytics ID</label>
                <input
                  value={seo.googleAnalyticsId}
                  onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Search Console ID</label>
                <input
                  value={seo.searchConsoleId}
                  onChange={(e) => setSeo({ ...seo, searchConsoleId: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Share2 size={20} />
              <h2 className="text-lg font-bold tracking-tight">Social Sharing (Open Graph)</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Default OG Image URL</label>
                <input
                  value={seo.ogImage}
                  onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="https://yourdomain.com/og-image.jpg"
                />
              </div>
              <div className="bg-stone-100 p-6 rounded-2xl">
                <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-4">Preview (approximate)</p>
                <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
                  <div className="h-32 bg-stone-200 flex items-center justify-center">
                    {seo.ogImage ? (
                      <img src={seo.ogImage} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <Globe size={32} className="text-stone-300" />
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs font-bold text-stone-900 truncate">{seo.metaTitle}</p>
                    <p className="text-[10px] text-stone-500 line-clamp-2">{seo.metaDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-stone-900">
              <Globe size={20} />
              <h2 className="text-lg font-bold tracking-tight">Advanced</h2>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Robots.txt</label>
              <textarea
                value={seo.robotsTxt}
                onChange={(e) => setSeo({ ...seo, robotsTxt: e.target.value })}
                rows={6}
                className="w-full border border-stone-200 p-4 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors font-mono text-xs rounded-xl"
              />
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
          <span>{saving ? 'Saving...' : 'Save SEO Settings'}</span>
        </button>
      </div>
    </div>
  );
}
