import React, { useEffect, useState } from 'react';
import { Megaphone, Download, AlertCircle } from 'lucide-react';
import { getPosts, Post } from '../../services/api';

const Announcements: React.FC = () => {
  const [list, setList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getPosts('Pengumuman');
        setList(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Megaphone size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Pengumuman Resmi</h1>
        <p className="text-slate-500">Informasi edaran, instruksi, dan maklumat organisasi.</p>
      </div>

      {loading ? (
         <p className="text-center text-slate-500">Memuat pengumuman...</p>
      ) : list.length === 0 ? (
         <div className="text-center py-10 border border-dashed rounded-xl border-slate-300">
           <p className="text-slate-500">Tidak ada pengumuman aktif saat ini.</p>
         </div>
      ) : (
        <div className="space-y-4">
          {list.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 mb-1 block">
                  {new Date(item.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{item.content}</p>
              </div>
              <button className="shrink-0 px-4 py-2 bg-green-50 text-green-700 font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-green-100 transition-colors">
                <Download size={16} /> Unduh PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;