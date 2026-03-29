import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Plus, Trash2, Copy, Image as ImageIcon, Search, X } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  createdAt: string;
}

export default function MediaLibrary() {
  const { data: media, loading } = useFirestore<MediaItem>('media', []);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = async () => {
    if (!newUrl || !newName) {
      toast.error('Please provide both URL and a name');
      return;
    }

    try {
      await addDoc(collection(db, 'media'), {
        url: newUrl,
        name: newName,
        type: 'image',
        createdAt: new Date().toISOString(),
      });
      toast.success('Media added to library');
      setIsAdding(false);
      setNewUrl('');
      setNewName('');
    } catch (error) {
      toast.error('Failed to add media');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this from the library?')) {
      try {
        await deleteDoc(doc(db, 'media', id));
        toast.success('Media removed');
      } catch (error) {
        toast.error('Failed to remove media');
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Media Library</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Manage your website's visual assets</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
        >
          <Plus size={18} />
          <span>Add New Asset</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
        <Search size={20} className="text-stone-400" />
        <input
          type="text"
          placeholder="Search assets by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-transparent border-none focus:outline-none text-stone-900"
        />
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 space-y-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-stone-900">Add New Media Asset</h2>
            <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Asset Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                placeholder="e.g. Hero Image - Living Room"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Image URL</label>
              <input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsAdding(false)}
              className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800"
            >
              Add to Library
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          <div>Loading...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="col-span-full bg-white p-20 rounded-[2.5rem] text-center border border-stone-100">
            <ImageIcon size={48} className="mx-auto mb-6 text-stone-200" />
            <p className="text-stone-400 text-lg font-light">No assets found.</p>
          </div>
        ) : (
          filteredMedia.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-xl">
              <div className="aspect-square overflow-hidden bg-stone-100">
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 truncate">{item.name}</p>
                <p className="text-[8px] text-stone-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="absolute inset-0 bg-stone-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-4">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="flex items-center space-x-2 bg-white text-stone-900 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-all"
                >
                  <Copy size={14} />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
