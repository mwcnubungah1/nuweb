import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, LogOut, Loader2, Upload, 
  Calendar, MapPin, Tag, Image as ImageIcon, Box, Megaphone
} from 'lucide-react';
import { getPosts, createPost, deletePost, uploadImage, Post } from '../../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('Berita');
  const [loading, setLoading] = useState(true);
  
  // State Form Lengkap
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', 
    content: '', 
    category: 'Berita', 
    author: 'Admin',
    tags: '',           
    event_date: '',     
    event_time: '',     
    location: '',
    // Khusus Aset
    asset_type: '',
    asset_status: 'Baik' 
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const tabs = ['Berita', 'Artikel', 'Agenda', 'Pengumuman', 'Dokumentasi', 'Aset'];

  // --- EFFECT ---
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
      const data = await getPosts(activeTab);
      setPosts(data || []);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---
  const resetForm = () => {
    setFormData({
      title: '', content: '', category: activeTab, author: 'Admin',
      tags: '', event_date: '', event_time: '', location: '',
      asset_type: '', asset_status: 'Baik'
    });
    setImageFile(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Payload dinamis sesuai Tab
      const payload: any = {
        title: formData.title,
        content: formData.content,
        category: activeTab,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      };

      // Tambahkan field khusus sesuai kategori
      if (activeTab === 'Agenda') {
        payload.event_date = formData.event_date;
        payload.event_time = formData.event_time;
        payload.location = formData.location;
      } else if (activeTab === 'Aset') {
        payload.location = formData.location;
        payload.asset_type = formData.asset_type;
        payload.asset_status = formData.asset_status;
      } else if (['Berita', 'Artikel'].includes(activeTab)) {
        payload.tags = formData.tags;
      }

      await createPost(payload);
      resetForm();
      fetchData(); 
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Yakin hapus data ini?')) return;
    try {
      await deletePost(id);
      fetchData();
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center text-white font-bold">NU</div>
          <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
        </div>
        <button onClick={() => { localStorage.removeItem('isLoggedIn'); navigate('/login'); }} className="text-red-600 flex gap-2 items-center text-sm font-bold hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
          <LogOut size={16} /> Keluar
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col gap-1 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu Utama</p>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); resetForm(); }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 ${
                activeTab === tab 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab === 'Agenda' ? <Calendar size={18}/> : 
               tab === 'Dokumentasi' ? <ImageIcon size={18}/> : 
               tab === 'Aset' ? <Box size={18}/> :
               tab === 'Pengumuman' ? <Megaphone size={18}/> :
               <div className="w-4 h-4 rounded-full border-2 border-current"></div>}
              {tab}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{activeTab}</h2>
                <p className="text-slate-500 text-sm mt-1">Kelola data {activeTab.toLowerCase()}.</p>
              </div>
              <button 
                onClick={() => setShowForm(!showForm)} 
                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                  showForm ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-green-800 text-white hover:bg-green-700'
                }`}
              >
                <Plus size={18} className={showForm ? "rotate-45 transition-transform" : "transition-transform"} /> 
                {showForm ? 'Batal' : 'Tambah Baru'}
              </button>
            </div>

            {/* --- FORM AREA --- */}
            {showForm && (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-10 animate-in slide-in-from-top-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Judul: Dipakai Semua */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {activeTab === 'Aset' ? 'Nama Aset / Barang' : 'Judul'}
                      </label>
                      <input required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                        value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>

                    {/* FIELD KHUSUS AGENDA */}
                    {activeTab === 'Agenda' && (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                          <input required type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                            value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Jam</label>
                          <input required type="text" placeholder="08:00 WIB" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                            value={formData.event_time} onChange={e => setFormData({...formData, event_time: e.target.value})} />
                        </div>
                      </>
                    )}

                    {/* FIELD KHUSUS ASET & AGENDA: Lokasi */}
                    {(activeTab === 'Agenda' || activeTab === 'Aset') && (
                      <div className={activeTab === 'Aset' ? '' : 'md:col-span-2'}>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label>
                        <input required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                          value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                      </div>
                    )}

                    {/* FIELD KHUSUS ASET: Tipe & Status */}
                    {activeTab === 'Aset' && (
                      <>
                         <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Aset</label>
                          <input required type="text" placeholder="Tanah / Bangunan / Kendaraan" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                            value={formData.asset_type} onChange={e => setFormData({...formData, asset_type: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Status Kondisi</label>
                          <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                            value={formData.asset_status} onChange={e => setFormData({...formData, asset_status: e.target.value})}>
                            <option value="Baik">Baik</option>
                            <option value="Rusak Ringan">Rusak Ringan</option>
                            <option value="Rusak Berat">Rusak Berat</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* FIELD KHUSUS BERITA/ARTIKEL: Tags */}
                    {['Berita', 'Artikel'].includes(activeTab) && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Tags</label>
                        <input type="text" placeholder="Nasional, Ekonomi..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                             value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
                      </div>
                    )}

                    {/* Deskripsi/Konten: Dipakai Semua */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                         {activeTab === 'Aset' ? 'Keterangan Aset' : 'Isi Konten / Deskripsi'}
                      </label>
                      <textarea required rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" 
                        value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                    </div>

                    {/* Upload Gambar: Opsional untuk Aset/Agenda */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Foto / Gambar</label>
                      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} 
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={resetForm} className="flex-1 py-3 font-bold text-slate-500 hover:text-slate-700">Batal</button>
                    <button disabled={uploading} type="submit" className="flex-[2] bg-green-800 text-white py-3 rounded-xl font-bold shadow-lg flex justify-center items-center gap-2">
                      {uploading ? 'Menyimpan...' : 'Simpan Data'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --- LIST DATA --- */}
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-800" /></div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-500">Belum ada data {activeTab}.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                    {/* Image */}
                    <div className="w-full sm:w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                      {post.image_url ? <img src={post.image_url} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full text-slate-300"><ImageIcon/></div>}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 w-full">
                      <h3 className="text-lg font-bold text-slate-800">{post.title}</h3>
                      
                      {/* Tampilan Khusus Aset */}
                      {activeTab === 'Aset' && (
                        <div className="flex gap-3 text-xs mt-1 mb-2">
                           <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold">{post.asset_type}</span>
                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1"><MapPin size={10}/> {post.location}</span>
                        </div>
                      )}

                      {/* Tampilan Khusus Agenda */}
                      {activeTab === 'Agenda' && (
                         <div className="flex gap-3 text-xs mt-1 mb-2">
                           <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded font-bold flex items-center gap-1"><Calendar size={10}/> {post.event_date}</span>
                         </div>
                      )}

                      <p className="text-sm text-slate-500 line-clamp-1">{post.content}</p>
                    </div>
                    
                    <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;