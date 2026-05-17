import { useState, useEffect, type FormEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { SiteSettings } from "../../types";
import { toast } from "sonner";
import {
  Save,
  Globe,
  Palette,
  Mail,
  Phone,
  MapPin,
  Share2,
} from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "site");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as SiteSettings);
        } else {
          // Default settings
          const defaultSettings: SiteSettings = {
            primaryColor: "#1c1917",
            secondaryColor: "#78716c",
            fontFamily: "Inter",
            siteName: "Apka Interior Wala",
            siteDescription:
              "Bhopal's premier international interior design and construction agency.",
            address: "Arera Colony, Bhopal, Madhya Pradesh, India",
            email: "info@apkainteriorwala.com",
            phone: "+91 98765 43210",
            socialLinks: {
              facebook: "",
              instagram: "",
              linkedin: "",
              youtube: "",
              pinterest: "",
            },
          };
          setSettings(defaultSettings);
        }
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "site"), settings);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Site Settings</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">
            Manage your global website configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50"
        >
          <Save size={18} />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-12 lg:grid-cols-2"
      >
        {/* General Info */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-8">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <Globe size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              General Information
            </h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Site Name
              </label>
              <input
                value={settings?.siteName}
                onChange={(e) =>
                  setSettings({ ...settings!, siteName: e.target.value })
                }
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Site Description
              </label>
              <textarea
                value={settings?.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings!, siteDescription: e.target.value })
                }
                rows={3}
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-8">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <Mail size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              Contact Details
            </h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Email Address
              </label>
              <input
                value={settings?.email}
                onChange={(e) =>
                  setSettings({ ...settings!, email: e.target.value })
                }
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Phone Number
              </label>
              <input
                value={settings?.phone}
                onChange={(e) =>
                  setSettings({ ...settings!, phone: e.target.value })
                }
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Office Address
              </label>
              <input
                value={settings?.address}
                onChange={(e) =>
                  setSettings({ ...settings!, address: e.target.value })
                }
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-8">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
              <Share2 size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              Social Media Links
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {["facebook", "instagram", "linkedin", "youtube", "pinterest"].map(
              (platform) => (
                <div key={platform} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 capitalize">
                    {platform}
                  </label>
                  <input
                    value={(settings?.socialLinks as any)?.[platform]}
                    onChange={(e) =>
                      setSettings({
                        ...settings!,
                        socialLinks: {
                          ...settings!.socialLinks,
                          [platform]: e.target.value,
                        },
                      })
                    }
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder={`https://${platform}.com/your-profile`}
                  />
                </div>
              ),
            )}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-stone-900 p-10 rounded-[2.5rem] shadow-sm text-white space-y-8">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Palette size={20} />
            </div>
            <h2 className="text-xl font-bold">Theme & Style</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Primary Color
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={settings?.primaryColor}
                  onChange={(e) =>
                    setSettings({ ...settings!, primaryColor: e.target.value })
                  }
                  className="h-10 w-10 rounded-lg bg-transparent cursor-pointer"
                />
                <input
                  value={settings?.primaryColor}
                  onChange={(e) =>
                    setSettings({ ...settings!, primaryColor: e.target.value })
                  }
                  className="flex-grow bg-white/5 border-b border-white/10 py-3 text-white focus:border-white focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Font Family
              </label>
              <select
                value={settings?.fontFamily}
                onChange={(e) =>
                  setSettings({ ...settings!, fontFamily: e.target.value })
                }
                className="w-full bg-white/5 border-b border-white/10 py-3 text-white focus:border-white focus:outline-none transition-colors"
              >
                <option value="Inter">Inter (Sans-serif)</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Playfair Display">
                  Playfair Display (Serif)
                </option>
                <option value="Cormorant Garamond">Cormorant Garamond</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
