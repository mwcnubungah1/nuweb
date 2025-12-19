import { supabase } from './supabase';

// Tipe data disesuaikan dengan kebutuhan Dashboard dan Database
export interface Post {
  id?: string;
  title: string;
  content: string;
  // Menggunakan string agar fleksibel, tapi tetap menyarankan tipe tertentu
  category: 'Berita' | 'Artikel' | 'Agenda' | 'Pengumuman' | 'Program' | string;
  image_url?: string;
  author?: string;
  date?: string;       // Tanggal manual (inputan user)
  created_at?: string; // Timestamp otomatis dari Supabase
}

// --- FUNGSI CRUD POSTS ---

// 1. AMBIL DATA (READ)
export const getPosts = async (category?: string) => {
  // Mulai query ke tabel 'posts'
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

  // Jika ada kategori spesifik (dan bukan 'Semua'), tambahkan filter
  if (category && category !== 'Semua') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error mengambil data kategori ${category}:`, error.message);
    throw error;
  }
  
  return data as Post[];
};

// 2. TAMBAH DATA (CREATE)
export const createPost = async (post: Post) => {
  // Hapus properti 'id' jika undefined agar Supabase membuatkan ID otomatis
  const { id, ...postData } = post;
  
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select();

  if (error) {
    console.error("Error menyimpan data:", error.message);
    throw error;
  }
  
  return data;
};

// 3. HAPUS DATA (DELETE)
export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error menghapus data:", error.message);
    throw error;
  }
};

// --- FUNGSI UPLOAD GAMBAR ---
export const uploadImage = async (file: File) => {
  try {
    // 1. Bersihkan nama file dan buat unik dengan timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    // 2. Upload ke bucket 'images'
    const { error: uploadError } = await supabase.storage
      .from('images') // Pastikan bucket ini ada di Supabase Storage Anda
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // 3. Dapatkan URL publik
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
    
  } catch (error) {
    console.error("Error upload gambar:", error);
    throw error;
  }
};