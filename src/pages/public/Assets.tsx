import React from 'react';
// PERBAIKAN: Naik 2 level (../../) untuk akses folder utils
import { MOCK_ASSETS } from '../../utils/constants';
import { MapPin, Info, Tag } from 'lucide-react';

const Assets: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Data Aset Organisasi</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Informasi inventarisasi dan aset yang dikelola oleh MWCNU Bungah sebagai bentuk transparansi publik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_ASSETS.map((asset) => (
          <div key={asset.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex gap-6">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
              <Tag className="text-slate-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
                  {asset.type}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{asset.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} className="text-green-600" />
                {asset.location}
              </div>
              <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                "{asset.description}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;