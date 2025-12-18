
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  BookOpen, 
  Users, 
  Calendar, 
  Database, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3,
  Search,
  LayoutDashboard,
  ImageIcon
} from 'lucide-react';
import { MOCK_NEWS, MOCK_PROFILES, MOCK_ASSETS } from '../../constants';

type Tab = 'Berita' | 'Artikel' | 'Profil' | 'Program' | 'Aset' | 'Dokumentasi' | 'Pesan';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Berita');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn');
    if (authStatus !== 'true') {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  const SidebarItem = ({ name, icon, tab }: { name: string, icon: React.ReactNode, tab: Tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        activeTab === tab 
          ? 'bg-green-800 text-white shadow-lg' 
          : 'text-slate-500 hover:bg-green-50 hover:text-green-800'
      }`}
    >
      {icon}
      {name}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center text-white font-bold">B</div>
          <span className="font-extrabold text-slate-900 tracking-tight">Admin Portal</span>
        </div>

        <nav className="space-y-2 flex-grow">
          <SidebarItem name="Berita Utama" icon={<Newspaper size={18}/>} tab="Berita" />
          <SidebarItem name="Artikel Dakwah" icon={<BookOpen size={18}/>} tab="Artikel" />
          <SidebarItem name="Banom & Lembaga" icon={<Users size={18}/>} tab="Profil" />
          <SidebarItem name="Program Kerja" icon={<Calendar size={18}/>} tab="Program" />
          <SidebarItem name="Dokumentasi" icon={<ImageIcon size={18}/>} tab="Dokumentasi" />
          <SidebarItem name="Aset Organisasi" icon={<Database size={18}/>} tab="Aset" />
          <SidebarItem name="Kritik & Saran" icon={<MessageSquare size={18}/>} tab="Pesan" />
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-8 lg:p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{activeTab}</h1>
            <p className="text-sm text-slate-500">Kelola semua konten {activeTab.toLowerCase()} di sini.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari data..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {activeTab !== 'Pesan' && (
              <button className="bg-green-800 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-green-700 transition-all shadow-md">
                <Plus size={18} /> Tambah Data
              </button>
            )}
          </div>
        </header>

        {/* Content Table / Grid */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Judul / Nama</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status / Kategori</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeTab === 'Berita' && MOCK_NEWS.filter(n => n.category === 'Berita').map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.author}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {activeTab === 'Profil' && MOCK_PROFILES.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">-</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {activeTab === 'Aset' && MOCK_ASSETS.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.location}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {activeTab === 'Pesan' && (
                   <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">Ahmad Fauzi</td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase">Unread</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">2024-05-21</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Search size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Placeholder */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
             <div className="flex gap-2">
               <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-500 disabled:opacity-50" disabled>Previous</button>
               <button className="px-3 py-1 bg-green-800 text-white rounded text-xs">1</button>
               <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-500">Next</button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
