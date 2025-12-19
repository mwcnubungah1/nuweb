import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, LogOut, Loader2, Upload 
} from 'lucide-react';
import { getPosts, createPost, deletePost, uploadImage, Post } from '../../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // State Data
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Berita');
  const [loading, setLoading] = useState(true);
  
  // State Form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Post>({
    title: '', content: '', category: 'Berita', author: 'Admin'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. Cek Login & Ambil Data
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isLoggedIn');
      if (!isAuth) navigate('/login');
    };
    
    checkAuth();
    fetchData();
  }, [activeTab, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mapping Tab ke Kategori Database
      const data = await getPosts(activeTab);
      setPosts(data || []);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await createPost({
        ...formData,
        category: activeTab as any, // Otomatis ikut tab yang aktif
        image_url: imageUrl,
        date: new Date().toISOString()
      });

      setShowForm(false);
      setFormData({ title: '', content: '', category: 'Berita', author: 'Admin' });
      setImageFile(null);
      fetchData(); // Refresh data
    } catch (error) {
      alert('Gagal menyimpan data!');
    } finally {
      setUploading(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id: string) => {
    if(!confirm('Yakin hapus data ini?')) return;
    try {
      await deletePost(id);
      fetchData();
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

  const tabs = ['Berita', 'Artikel', 'Agenda', 'Program', 'Pengumuman'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Admin */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-green-900">Admin Dashboard</h1>
        <button onClick={() => { localStorage.removeItem('isLoggedIn'); navigate('/login'); }} className="text-red-600 flex gap-2 items-center text-sm font-bold">
          <LogOut size={16} /> Keluar
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Tabs */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
          <div className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowForm(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm ${activeTab === tab ? 'bg-green-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Kelola {activeTab}</h2>
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-green-800 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700"
            >
              <Plus size={18} /> {showForm ? 'Batal' : 'Tambah Baru'}
            </button>
          </div>

          {/* FORM INPUT */}
          {showForm && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 animate-in slide-in-from-top-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Judul</label>
                  <input required type="text" className="w-full p-2 border rounded-lg" 
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Konten / Deskripsi</label>
                  <textarea required rows={4} className="w-full p-2 border rounded-lg" 
                    value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Gambar (Opsional)</label>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer bg-slate-100 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-200">
                      <input type="file" className="hidden" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
                      <span className="flex items-center gap-2 text-sm"><Upload size={16}/> Pilih File</span>
                    </label>
                    <span className="text-sm text-slate-500">{imageFile?.name}</span>
                  </div>
                </div>
                <button disabled={uploading} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold w-full disabled:opacity-50">
                  {uploading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </form>
            </div>
          )}

          {/* LIST DATA */}
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-800" /></div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {post.image_url && <img src={post.image_url} alt="" className="w-16 h-16 object-cover rounded-lg bg-slate-100" />}
                    <div>
                      <h3 className="font-bold text-slate-800">{post.title}</h3>
                      <p className="text-xs text-slate-500 truncate max-w-md">{post.content}</p>
                      <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded mt-1 inline-block">{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {posts.length === 0 && <p className="text-center text-slate-400 py-10">Belum ada data {activeTab}.</p>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;