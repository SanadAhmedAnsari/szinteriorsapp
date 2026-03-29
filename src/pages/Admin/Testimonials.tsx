import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Testimonial } from '../../types';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Save, X, MessageSquare, Star, User } from 'lucide-react';

export default function AdminTestimonials() {
  const { data: testimonials, loading } = useFirestore<Testimonial>('testimonials', []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: '',
  });

  const handleSave = async () => {
    if (!formData.name || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), formData);
        toast.success('Testimonial updated');
      } else {
        await addDoc(collection(db, 'testimonials'), formData);
        toast.success('Testimonial added');
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({ name: '', role: '', content: '', rating: 5, image: '' });
    } catch (error) {
      toast.error('Failed to save testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', id));
        toast.success('Testimonial deleted');
      } catch (error) {
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData(testimonial);
    setIsAdding(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Testimonials Manager</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Manage client reviews and feedback</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
          >
            <Plus size={18} />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-stone-900">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Client Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Role / Company</label>
                <input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. CEO, Tech Corp"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Rating (1-5)</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`p-2 transition-colors ${formData.rating && formData.rating >= star ? 'text-yellow-400' : 'text-stone-200'}`}
                    >
                      <Star size={24} fill={formData.rating && formData.rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Client Photo URL</label>
                <input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Testimonial Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  placeholder="What did the client say?"
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
              <span>{editingId ? 'Update Testimonial' : 'Save Testimonial'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {loading ? (
          <div>Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full bg-white p-20 rounded-[2.5rem] text-center border border-stone-100">
            <MessageSquare size={48} className="mx-auto mb-6 text-stone-200" />
            <p className="text-stone-400 text-lg font-light">No testimonials yet.</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6 transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-stone-100">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-stone-400"><User size={20} /></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">{testimonial.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => startEdit(testimonial)}
                    className="p-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex space-x-1 text-yellow-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-stone-600 text-sm italic line-clamp-4">"{testimonial.content}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
