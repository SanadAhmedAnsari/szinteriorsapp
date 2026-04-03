import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Save, FileText, Layout, Type, Image as ImageIcon } from 'lucide-react';

interface PageContent {
  id: string;
  title: string;
  sections: {
    [key: string]: {
      type: 'text' | 'textarea' | 'image';
      label: string;
      value: string;
    };
  };
}

const PAGE_TEMPLATES: { [key: string]: PageContent } = {
  home: {
    id: 'home',
    title: 'Home Page',
    sections: {
      heroTitle: { type: 'text', label: 'Hero Title', value: 'Crafting Spaces That Tell Your Story' },
      heroSubtitle: { type: 'textarea', label: 'Hero Subtitle', value: 'Premium interior design and construction services for residential and commercial projects in Bhopal and beyond.' },
      heroImage: { type: 'image', label: 'Hero Image URL', value: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80' },
      aboutTitle: { type: 'text', label: 'About Section Title', value: 'Excellence in Design & Construction' },
      aboutText: { type: 'textarea', label: 'About Section Text', value: 'With over a decade of experience, SZ Interiors & Construction has been at the forefront of creating luxury spaces that blend functionality with aesthetic brilliance.' },
    }
  },
  about: {
    id: 'about',
    title: 'About Page',
    sections: {
      introTitle: { type: 'text', label: 'Intro Title', value: 'Our Journey of Excellence' },
      introText: { type: 'textarea', label: 'Intro Text', value: 'Founded in Bhopal, SZ Interiors & Construction has grown into an international agency known for its commitment to quality and innovation.' },
      mission: { type: 'textarea', label: 'Our Mission', value: 'To transform our clients\' visions into reality through exceptional design and superior craftsmanship.' },
      vision: { type: 'textarea', label: 'Our Vision', value: 'To be the global leader in luxury interior design and sustainable construction solutions.' },
      founderName: { type: 'text', label: 'Founder Name', value: 'Syed Zaid' },
      founderRole: { type: 'text', label: 'Founder Role', value: 'Founder & Principal Architect' },
      founderBio: { type: 'textarea', label: 'Founder Bio', value: 'With a passion for architecture and a keen eye for detail, Syed Zaid leads the team in creating spaces that are both functional and breathtaking.' },
      founderImage: { type: 'image', label: 'Founder Image URL', value: 'https://i.pravatar.cc/600?u=zaid' },
    }
  }
};

export default function PageEditor() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState<PageContent>(PAGE_TEMPLATES.home);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'pages', selectedPage);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPageData({ ...PAGE_TEMPLATES[selectedPage], ...docSnap.data() });
        } else {
          setPageData(PAGE_TEMPLATES[selectedPage]);
        }
      } catch (error) {
        toast.error('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [selectedPage]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'pages', selectedPage), pageData);
      toast.success(`${pageData.title} updated successfully`);
    } catch (error) {
      toast.error('Failed to update page content');
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (key: string, value: string) => {
    setPageData({
      ...pageData,
      sections: {
        ...pageData.sections,
        [key]: { ...pageData.sections[key], value }
      }
    });
  };

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Page Editor</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Edit static content across your website</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Select Page:</label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="bg-white border border-stone-200 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-stone-900 focus:border-stone-900 focus:outline-none transition-all"
          >
            <option value="home">Home Page</option>
            <option value="about">About Page</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {Object.entries(pageData.sections).map(([key, section]) => (
              <div key={key} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-4">
                <div className="flex items-center space-x-3 text-stone-400">
                  {section.type === 'image' ? <ImageIcon size={16} /> : <Type size={16} />}
                  <label className="text-[10px] font-bold uppercase tracking-widest">{section.label}</label>
                </div>
                {section.type === 'textarea' ? (
                  <textarea
                    value={section.value}
                    onChange={(e) => updateSection(key, e.target.value)}
                    rows={4}
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={section.value}
                    onChange={(e) => updateSection(key, e.target.value)}
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  />
                )}
                {section.type === 'image' && section.value && (
                  <div className="mt-4 h-40 w-full overflow-hidden rounded-2xl">
                    <img src={section.value} alt={section.label} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="bg-stone-900 p-10 rounded-[2.5rem] text-white space-y-6">
              <Layout size={32} className="text-stone-400" />
              <h3 className="text-xl font-bold tracking-tight">Editor Tips</h3>
              <ul className="space-y-4 text-sm text-stone-400 font-light">
                <li className="flex items-start space-x-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-stone-500 mt-1.5 shrink-0"></div>
                  <span>Use high-quality image URLs from the Media Library.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-stone-500 mt-1.5 shrink-0"></div>
                  <span>Keep text concise and impactful for better readability.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-stone-500 mt-1.5 shrink-0"></div>
                  <span>Changes will be reflected instantly on the live site.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center space-x-3 bg-stone-900 px-8 py-6 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50 rounded-[2rem]"
            >
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
