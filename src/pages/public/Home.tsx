import React, { useEffect, useState } from 'react';
// ... import icon lainnya
import { getPosts, Post } from '../../services/api'; // Import dari API

const Home: React.FC = () => {
  const [news, setNews] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data saat halaman dibuka
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getPosts('Berita'); // Ambil khusus kategori Berita
        // Ambil 2 berita terbaru saja
        setNews(data?.slice(0, 2) || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="space-y-16 pb-16">
       {/* ... Hero Section biarkan sama ... */}

       {/* Bagian Berita Dinamis */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Berita Terkini</h2>
        </div>
        
        {loading ? (
           <p>Memuat berita...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                <div className="h-48 overflow-hidden bg-slate-200">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ... Footer dll ... */}
    </div>
  );
};

export default Home;