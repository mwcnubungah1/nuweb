import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  FileText, 
  Users, 
  ChevronRight, 
  MapPin 
} from 'lucide-react';
import { getPosts, Post } from '../../services/api';

const Home: React.FC = () => {
  const [news, setNews] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data Berita saat halaman dibuka
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Mengambil postingan dengan kategori 'Berita'
        const data = await getPosts('Berita'); 
        // Ambil 2 berita terbaru saja untuk ditampilkan di Home
        setNews(data?.slice(0, 2) || []);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="space-y-0 pb-16">
       {/* --- HERO SECTION --- */}
       <section className="relative bg-green-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-green-800 border border-green-700 text-xs font-bold tracking-wider uppercase mb-4">
            Portal Resmi
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Majelis Wakil Cabang <br/>
            <span className="text-green-300">Nahdlatul Ulama</span> Bungah
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Merawat Jagat, Membangun Peradaban. Berkhidmat untuk umat melalui layanan keagamaan, pendidikan, dan sosial kemasyarakatan di Kecamatan Bungah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/profile" 
              className="px-8 py-4 bg-white text-green-900 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Tentang Kami <ArrowRight size={18} />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-green-800 text-white border border-green-700 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* --- QUICK ACCESS / LAYANAN --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link to="/agenda" className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hover:transform hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Agenda Kegiatan</h3>
            <p className="text-slate-500 text-sm">Jadwal pengajian, rapat, dan kegiatan sosial MWCNU Bungah.</p>
          </Link>
          
          {/* Card 2 */}
          <Link to="/artikel" className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hover:transform hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Artikel & Opini</h3>
            <p className="text-slate-500 text-sm">Kajian keislaman, opini tokoh, dan khazanah Aswaja.</p>
          </Link>
          
          {/* Card 3 */}
          <Link to="/profile" className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hover:transform hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Lembaga & Banom</h3>
            <p className="text-slate-500 text-sm">Struktur organisasi, lembaga, dan badan otonom di bawah naungan MWCNU.</p>
          </Link>
        </div>
      </section>

       {/* --- BAGIAN BERITA DINAMIS --- */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-green-600 font-bold tracking-wider text-sm uppercase">Kabar Nahdliyin</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Berita Terkini</h2>
          </div>
          <Link to="/berita" className="text-green-700 font-bold hover:underline flex items-center gap-1">
            Lihat Semua Berita <ChevronRight size={18} />
          </Link>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-800"></div>
           </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500">Belum ada berita terbaru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <Link to="#" key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group block">
                <div className="h-64 overflow-hidden bg-slate-200 relative">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">No Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800 uppercase tracking-wider">
                    Berita
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <Calendar size={14} />
                    {item.created_at 
                      ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
                      : 'Baru Saja'}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-green-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {item.content}
                  </p>
                  <span className="text-green-700 font-bold text-sm flex items-center gap-2">
                    Baca Selengkapnya <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* --- INFO LOKASI SINGKAT --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
        <div className="bg-green-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-green-100">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center shrink-0">
               <MapPin size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Kunjungi Kantor Kami</h3>
              <p className="text-slate-600 max-w-md">
                Jl. Raya Bungah No. 12, Kecamatan Bungah, Kabupaten Gresik, Jawa Timur. Terbuka untuk layanan umat setiap hari kerja.
              </p>
            </div>
          </div>
          <Link to="/contact" className="px-8 py-3 bg-green-800 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 whitespace-nowrap">
            Lihat di Peta
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;