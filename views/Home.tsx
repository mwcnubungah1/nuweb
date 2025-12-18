
import React from 'react';
import { ArrowRight, Book, Users, Calendar, ShieldCheck } from 'lucide-react';
import { MOCK_NEWS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/nuhome/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-green-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Official Portal</span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Membangun Peradaban dari <span className="text-yellow-500">Bungah</span> untuk Bangsa.
            </h1>
            <p className="text-lg text-slate-200 mb-8">
              Wadah aspirasi dan informasi resmi Majelis Wakil Cabang Nahdlatul Ulama Bungah. Bergabunglah dalam gerakan dakwah dan pemberdayaan umat.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2">
                Lihat Program <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full font-bold transition-all">
                Tentang Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Banom', value: '14+', icon: <Users className="text-green-600" /> },
            { label: 'Lembaga', value: '18+', icon: <ShieldCheck className="text-green-600" /> },
            { label: 'Ranting', value: '22', icon: <Book className="text-green-600" /> },
            { label: 'Program', value: '50+', icon: <Calendar className="text-green-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="p-4 bg-green-50 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Berita & Artikel Terkini</h2>
            <p className="text-slate-500">Update terbaru seputar kegiatan dan pemikiran dari MWCNU Bungah.</p>
          </div>
          <button className="text-green-700 font-bold hover:underline">Lihat Semua</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_NEWS.map((news) => (
            <div key={news.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row h-full">
              <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-widest">{news.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3 leading-tight group-hover:text-green-800 transition-colors">{news.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{news.excerpt}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400">
                  <span>{news.date}</span>
                  <span>Oleh {news.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ingin Berkontribusi?</h2>
            <p className="text-green-100 mb-8 max-w-xl mx-auto">
              Bantu kami menyebarkan kebaikan melalui zakat, infaq, atau tenaga. Bersama-sama membangun Bungah yang mandiri.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-green-950 font-bold px-8 py-3 rounded-full transition-all">
                Donasi Sekarang
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-3 rounded-full font-bold transition-all">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
