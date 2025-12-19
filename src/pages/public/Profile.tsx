import React, { useState } from 'react';
// Pastikan MOCK_PROFILES di utils/constants.ts sudah diupdate datanya
import { MOCK_PROFILES } from '../../utils/constants'; 

const Profile: React.FC = () => {
  // State filter ditambah 'Pengurus Harian'
  const [filter, setFilter] = useState<'All' | 'Pengurus Harian' | 'Banom' | 'Lembaga'>('All');

  const filtered = filter === 'All' 
    ? MOCK_PROFILES 
    : MOCK_PROFILES.filter(p => p.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Profil Organisasi</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Mengenal lebih dekat struktur kepengurusan MWCNU Bungah.
        </p>
      </div>

      {/* Navigasi Filter Kategori */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {['All', 'Pengurus Harian', 'Banom', 'Lembaga'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
              filter === f 
                ? 'bg-green-800 text-white border-green-800 shadow-lg shadow-green-900/20' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-green-500 hover:text-green-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               {/* Hiasan background icon jika diperlukan */}
            </div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center p-3 border border-slate-100">
                <img src={p.logoUrl || "https://upload.wikimedia.org/wikipedia/commons/2/22/Nahdlatul_Ulama_Logo.svg"} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                p.type === 'Banom' ? 'bg-blue-50 text-blue-700' : 
                p.type === 'Lembaga' ? 'bg-orange-50 text-orange-700' :
                'bg-green-50 text-green-700'
              }`}>
                {p.type}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-green-800 transition-colors">{p.name}</h3>
            
            <div className="h-px w-10 bg-slate-200 my-4 group-hover:w-full group-hover:bg-green-200 transition-all duration-500"></div>
            
            <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
              {p.description}
            </p>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">Ketua / Koordinator</p>
              <p className="font-bold text-slate-800 text-sm">{p.leader}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;