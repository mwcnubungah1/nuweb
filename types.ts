
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Berita' | 'Artikel';
  author: string;
  date: string;
  imageUrl: string;
}

export interface BanomLembaga {
  id: string;
  name: string;
  type: 'Banom' | 'Lembaga';
  description: string;
  leader: string;
  logoUrl: string;
}

export interface Program {
  id: string;
  title: string;
  status: 'Berjalan' | 'Selesai' | 'Mendatang';
  description: string;
  date: string;
}

export interface Asset {
  id: string;
  name: string;
  location: string;
  type: 'Tanah' | 'Bangunan' | 'Kendaraan' | 'Lainnya';
  description: string;
}

export interface Documentation {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}
