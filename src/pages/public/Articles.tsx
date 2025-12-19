import React, { useEffect, useState } from 'react';
import { Tag, Calendar, User, FileText } from 'lucide-react';
import { getPosts, Post } from '../../services/api'; 

interface ArticlesProps {
  category: string; 
}

const Articles: React.FC<ArticlesProps> = ({ category }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Re-fetch setiap kali kategori berubah
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setPosts([]); // Clear data lama saat switch kategori
      try {
        const data = await getPosts(category);
        setPosts(data || []);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{category} Terkini</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Kumpulan {category.toLowerCase()} terbaru dari MWCNU Bungah.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-800"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <FileText className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <p className="text-slate-500">Belum ada {category.toLowerCase()} yang diterbitkan.</p>
          <p className="text-xs text-slate-400 mt-2">Silakan tambahkan data melalui Dashboard Admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="h-56 bg-slate-200 relative overflow-hidden">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">No Image</div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </div>
                  <div className="flex items-center gap-1"><User size={14} /> Admin</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">{item.title}</h3>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded">
                      <Tag size={10} /> {item.tags}
                    </span>
                  </div>
                )}
                <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">{item.content}</p>
                <button className="w-full py-3 rounded-xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-green-50 hover:text-green-700 transition-all mt-auto">
                  Baca Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;