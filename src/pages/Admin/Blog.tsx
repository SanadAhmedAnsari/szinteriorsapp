import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { BlogPost } from '../../types';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Save, X, FileText, User, Tag, Calendar } from 'lucide-react';

export default function AdminBlog() {
  const { data: posts, loading } = useFirestore<BlogPost>('blog', []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'Design Tips',
    image: '',
    author: 'Zainab Khan',
    published: true,
  });

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, 'blog', editingId), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Post updated');
      } else {
        await addDoc(collection(db, 'blog'), {
          ...formData,
          createdAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        });
        toast.success('Post added');
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({ title: '', slug: '', content: '', excerpt: '', category: 'Design Tips', image: '', author: 'Zainab Khan', published: true });
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'blog', id));
        toast.success('Post deleted');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData(post);
    setIsAdding(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Blog Manager</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Share your insights and inspiration with the world</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
          >
            <Plus size={18} />
            <span>New Blog Post</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-stone-900">{editingId ? 'Edit Post' : 'New Blog Post'}</h2>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Post Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="e.g. Top 10 Interior Design Trends"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Category</label>
                  <input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="e.g. Design Tips"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Author</label>
                  <input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  placeholder="Short summary for the blog list..."
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Featured Image URL</label>
                <input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Content (Markdown supported)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  placeholder="Write your article here..."
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
              <span>{editingId ? 'Update Post' : 'Publish Post'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {loading ? (
          <div>Loading...</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full bg-white p-20 rounded-[2.5rem] text-center border border-stone-100">
            <FileText size={48} className="mx-auto mb-6 text-stone-200" />
            <p className="text-stone-400 text-lg font-light">No blog posts yet.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 flex space-x-8 transition-all hover:shadow-xl">
              <div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{post.category}</span>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(post)}
                      className="p-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-stone-900 line-clamp-2">{post.title}</h3>
                <div className="flex items-center space-x-4 text-[10px] text-stone-500 uppercase tracking-widest">
                  <span className="flex items-center space-x-1"><User size={12} /> <span>{post.author}</span></span>
                  <span className="flex items-center space-x-1"><Calendar size={12} /> <span>{new Date(post.publishedAt).toLocaleDateString()}</span></span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
