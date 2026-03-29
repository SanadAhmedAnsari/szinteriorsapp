import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Service } from '../../types';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Save, X, Briefcase } from 'lucide-react';

export default function AdminServices() {
  const { data: services, loading } = useFirestore<Service>('services');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Home',
    order: 0,
  });

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, 'services', editingId), formData);
        toast.success('Service updated');
      } else {
        await addDoc(collection(db, 'services'), formData);
        toast.success('Service added');
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({ title: '', description: '', icon: 'Home', order: 0 });
    } catch (error) {
      toast.error('Failed to save service');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDoc(doc(db, 'services', id));
        toast.success('Service deleted');
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    setIsAdding(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Services Manager</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Manage the services you offer to clients</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
          >
            <Plus size={18} />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-stone-900">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Service Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. Residential Interior Design"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Icon Name (Lucide)</label>
                <input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. Home, Building, Hammer"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  placeholder="Describe the service..."
                />
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
              <span>{editingId ? 'Update Service' : 'Save Service'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div>Loading...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full bg-white p-20 rounded-[2.5rem] text-center border border-stone-100">
            <Briefcase size={48} className="mx-auto mb-6 text-stone-200" />
            <p className="text-stone-400 text-lg font-light">No services added yet.</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6 group">
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                  <Briefcase size={24} />
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">{service.title}</h3>
                <p className="mt-4 text-sm text-stone-500 leading-relaxed line-clamp-3">{service.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
