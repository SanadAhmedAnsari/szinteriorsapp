import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { VideoContent } from '../../types';
import { Plus, Trash2, Edit2, Play, Video, ExternalLink } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'sonner';

export default function AdminVideos() {
  const { data: videos, loading } = useFirestore<VideoContent>('videos', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    type: 'project' as 'project' | 'tutorial',
    thumbnail: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVideo) {
        await updateDoc(doc(db, 'videos', editingVideo.id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Video updated');
      } else {
        await addDoc(collection(db, 'videos'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        toast.success('Video added');
      }
      setIsModalOpen(false);
      setEditingVideo(null);
      setFormData({ title: '', description: '', videoUrl: '', type: 'project', thumbnail: '' });
    } catch (error) {
      toast.error('Failed to save video');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteDoc(doc(db, 'videos', id));
        toast.success('Video deleted');
      } catch (error) {
        toast.error('Failed to delete video');
      }
    }
  };

  const openEdit = (video: VideoContent) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      type: video.type,
      thumbnail: video.thumbnail || '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Video Content</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Manage your project reels and tutorials</p>
        </div>
        <button
          onClick={() => {
            setEditingVideo(null);
            setFormData({ title: '', description: '', videoUrl: '', type: 'project', thumbnail: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-3 bg-stone-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 rounded-xl"
        >
          <Plus size={18} />
          <span>Add Video</span>
        </button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6">
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-stone-100">
                <img
                  src={video.thumbnail || `https://picsum.photos/seed/${video.id}/800/1400`}
                  alt={video.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900">
                    {video.type}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-stone-900">{video.title}</h3>
                <p className="text-sm text-stone-500 line-clamp-2">{video.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => openEdit(video)}
                      className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white p-12 rounded-[3rem] shadow-2xl space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-light text-stone-900">
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-900">
                <Plus size={32} className="rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Video Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="Project Reel: Modern Minimalist"
                  />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Content Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'project' | 'tutorial' })}
                      className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    >
                      <option value="project">Project Reel</option>
                      <option value="tutorial">Tutorial/Tip</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Video URL</label>
                    <input
                      type="url"
                      required
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                      placeholder="YouTube or Instagram URL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Thumbnail URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                    placeholder="Brief description of the video..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 py-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 rounded-2xl shadow-xl shadow-stone-900/10"
              >
                {editingVideo ? 'Update Video' : 'Add Video'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
