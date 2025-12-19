import React, { useState } from 'react';
// Naik dari public -> pages -> src, lalu masuk utils
import { MOCK_PROFILES } from '../../utils/constants';
import { Users, Shield, Briefcase } from 'lucide-react';

const Profile: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Banom' | 'Lembaga'>('All');

  const filtered = filter === 'All' 
    ? MOCK_PROFILES 
    : MOCK_PROFILES.filter(p => p.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Profil Organisasi</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          MWCNU Bungah menaungi berbagai Badan Otonom dan Lembaga untuk mencakup berbagai aspek kehidupan masyarakat.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {['All', 'Banom', 'Lembaga'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              filter === f 
                ? 'bg-green-800 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-green-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center overflow-hidden">
                <img src={p.logoUrl} alt={p.name} className="w-12 h-12 object-contain" />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                p.type === 'Banom' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
              }`}>
                {p.type}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-800 transition-colors">{p.name}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {p.description}
            </p>
            <div className="pt-6 border-t border-slate-50">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Ketua / Koordinator</p>
              <p className="font-bold text-slate-800">{p.leader}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;