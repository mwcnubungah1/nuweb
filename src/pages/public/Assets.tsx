import React, { useEffect, useState } from 'react';
import { getPosts, Post } from '../../services/api';
import { MapPin, Tag, Archive } from 'lucide-react';

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getPosts('Aset');
        setAssets(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Data Aset Organisasi</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Informasi inventarisasi dan aset yang dikelola oleh MWCNU Bungah sebagai bentuk transparansi publik.
        </p>
      </div>

      {loading ? (
         <p className="text-center text-slate-500">Memuat data aset...</p>
      ) : assets.length === 0 ? (
         <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
           <Archive className="mx-auto h-10 w-10 text-slate-400 mb-3" />
           <p className="text-slate-500 font-medium">Belum ada data aset yang terdaftar.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                {asset.image_url ? (
                  <img src={asset.image_url} alt={asset.title} className="w-full h-full object-cover" />
                ) : (
                  <Tag className="text-slate-400" />
                )}
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
                    {asset.asset_type || 'Aset'}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                    asset.asset_status === 'Baik' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {asset.asset_status || 'Umum'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{asset.title}</h3>
                {asset.location && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="text-green-600" />
                    {asset.location}
                  </div>
                )}
                <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                  "{asset.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assets;