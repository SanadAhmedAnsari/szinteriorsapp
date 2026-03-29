import { useFirestore } from '../../hooks/useFirestore';
import { ContactMessage } from '../../types';
import { Mail, Phone, Calendar, Trash2, User } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'sonner';

export default function AdminMessages() {
  const { data: messages, loading } = useFirestore<ContactMessage>('messages', []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
        toast.success('Message deleted');
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-stone-900">Contact Messages</h1>
          <p className="mt-2 text-stone-500 text-sm uppercase tracking-widest">Manage form submissions from your website</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] text-center border border-stone-100">
            <MessageSquare size={48} className="mx-auto mb-6 text-stone-200" />
            <p className="text-stone-400 text-lg font-light">No messages received yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-8 flex flex-col md:flex-row md:items-start md:space-y-0 md:space-x-12">
              <div className="space-y-6 md:w-1/3">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900">{msg.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-stone-600">
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-stone-400" />
                    <span>{msg.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-stone-400" />
                    <span>{msg.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow space-y-6">
                <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400">Message Content</h5>
                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { MessageSquare } from 'lucide-react';
