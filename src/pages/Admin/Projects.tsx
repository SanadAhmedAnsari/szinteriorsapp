import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Project } from '../../types';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Save, X, ImageIcon, MapPin, Tag } from 'lucide-react';
import { slugify } from '../../lib/utils';

export default function AdminProjects() {
  const { data: projects, loading } = useFirestore<Project>('projects', []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    description: '',
    location: '',
    category: 'Residential',
    image: '',
    gallery: [],
    featured: false,
  });
  const [galleryInput, setGalleryInput] = useState('');

  const handleSave = async () => {
    if (!formData.title || !formData.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    const gallery = galleryInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = formData.slug || slugify(formData.title!);

    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          ...formData,
          slug,
          gallery,
          updatedAt: serverTimestamp(),
        });
        toast.success('Project updated');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          slug,
          gallery,
          createdAt: new Date().toISOString(),
        });
        toast.success('Project added');
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({ title: '', slug: '', description: '', location: '', category: 'Residential', image: '', gallery: [], featured: false });
      setGalleryInput('');
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        toast.success('Project deleted');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setGalleryInput((project.gallery || []).join(', '));
    setIsAdding(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Projects Manager</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Manage your portfolio and featured masterpieces</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
          >
            <Plus size={18} />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-stone-900">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Project Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      title,
                      slug: editingId ? prev.slug : slugify(title),
                    }));
                  }}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. The Royal Villa"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">URL Slug (auto-generated)</label>
                <input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-500 font-mono text-sm focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="the-royal-villa"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Construction">Construction</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Location</label>
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="e.g. Arera Colony, Bhopal"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  placeholder="Tell the story of this project..."
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-5 w-5 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
                <label htmlFor="featured" className="text-sm font-medium text-stone-700">Feature this project on home page</label>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Main Image URL</label>
                <input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="https://... or /images/filename.jpg"
                />
              </div>
              {formData.image && (
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-stone-100">
                  <img src={formData.image} alt="Preview" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Gallery Images <span className="normal-case text-stone-300">(comma-separated URLs)</span>
                </label>
                <textarea
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  rows={3}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none text-sm"
                  placeholder="/images/photo1.jpg, /images/photo2.jpg, ..."
                />
                <p className="text-[11px] text-stone-400">First image is shown largest. Leave empty to use the main image only.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
            >
              <Save size={18} />
              <span>{editingId ? 'Update Project' : 'Save Project'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div>Loading...</div>
        ) : projects.length === 0 ? (
          <div className="col-span-full bg-white p-20 rounded-[2.5rem] text-center border border-stone-100">
            <ImageIcon size={48} className="mx-auto mb-6 text-stone-200" />
            <p className="text-stone-400 text-lg font-light">No projects added yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="group flex flex-col bg-white overflow-hidden rounded-[2.5rem] shadow-sm border border-stone-100 transition-all hover:shadow-xl">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-3 rounded-xl bg-white/90 text-stone-900 hover:bg-white transition-all shadow-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-3 rounded-xl bg-red-500/90 text-white hover:bg-red-500 transition-all shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-stone-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900">{project.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-stone-500">
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
