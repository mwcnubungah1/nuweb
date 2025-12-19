import { supabase } from './supabase';

// Tipe data sesuai database
export interface Post {
  id?: string;
  title: string;
  content: string;
  category: 'Berita' | 'Artikel' | 'Agenda' | 'Pengumuman' | 'Program';
  image_url?: string;
  author?: string;
  date?: string;
}

// --- FUNGSI CRUD POSTS ---

// Ambil semua data berdasarkan kategori
export const getPosts = async (category?: string) => {
  let query = supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (category) query = query.eq('category', category);
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Tambah data baru
export const createPost = async (post: Post) => {
  const { data, error } = await supabase.from('posts').insert([post]).select();
  if (error) throw error;
  return data;
};

// Hapus data
export const deletePost = async (id: string) => {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
};

// --- FUNGSI UPLOAD GAMBAR ---
export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage.from('images').upload(filePath, file);
  if (error) throw error;

  // Dapatkan URL publik
  const { data } = supabase.storage.from('images').getPublicUrl(filePath);
  return data.publicUrl;
};