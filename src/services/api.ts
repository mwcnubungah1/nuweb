import { supabase } from './supabase';

// --- TIPE DATA (INTERFACE) ---
// Diperbarui untuk mencakup kebutuhan Agenda, Aset, dan Tags
export interface Post {
  id?: string;
  title: string;
  content: string;
  category: string; // 'Berita' | 'Artikel' | 'Agenda' | 'Pengumuman' | 'Aset' | 'Dokumentasi'
  image_url?: string;
  author?: string;
  created_at?: string; // Timestamp otomatis dari Supabase

  // --- FIELD TAMBAHAN (OPSIONAL) ---
  // Agar tidak error saat kategori lain tidak menggunakannya, kita set sebagai opsional (?)
  
  // Khusus Berita/Artikel
  tags?: string; 

  // Khusus Agenda
  event_date?: string; // Format: YYYY-MM-DD
  event_time?: string; // Format: 08:00 WIB
  
  // Khusus Agenda & Aset
  location?: string;

  // Khusus Aset
  asset_type?: string;   // Tanah, Bangunan, Kendaraan
  asset_status?: string; // Baik, Rusak Ringan, Rusak Berat
}

// --- FUNGSI CRUD POSTS ---

// 1. AMBIL DATA (READ)
export const getPosts = async (category?: string) => {
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter kategori jika ada
    if (category && category !== 'Semua') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as Post[];
    
  } catch (error: any) {
    console.error(`Error mengambil data kategori ${category}:`, error.message);
    return []; // Return array kosong agar aplikasi tidak crash
  }
};

// 2. TAMBAH DATA (CREATE)
export const createPost = async (post: Post) => {
  try {
    // Buang properti 'id' (jika undefined) agar Supabase generate auto-increment/UUID
    // Pastikan field undefined tidak dikirim agar tidak menimpa default value database
    const postData = Object.fromEntries(
      Object.entries(post).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    );
    
    const { data, error } = await supabase
      .from('posts')
      .insert([postData]) // Kirim object yang sudah bersih
      .select();

    if (error) throw error;
    return data;

  } catch (error: any) {
    console.error("Error menyimpan data:", error.message);
    throw error;
  }
};

// 3. HAPUS DATA (DELETE)
export const deletePost = async (id: string) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error: any) {
    console.error("Error menghapus data:", error.message);
    throw error;
  }
};

// --- FUNGSI UPLOAD GAMBAR ---
export const uploadImage = async (file: File) => {
  try {
    // Validasi file (Opsional: Cek ukuran atau tipe)
    if (!file) throw new Error("File tidak ditemukan");

    // 1. Buat nama file unik
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    // 2. Upload ke bucket 'images'
    const { error: uploadError } = await supabase.storage
      .from('images') 
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // 3. Ambil URL Publik
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
    
  } catch (error: any) {
    console.error("Error upload gambar:", error.message);
    // Kembalikan string kosong atau throw error agar UI tahu upload gagal
    throw error;
  }
};