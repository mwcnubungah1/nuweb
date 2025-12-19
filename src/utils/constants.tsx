import React from 'react';
import { 
  Home, 
  Newspaper, 
  BookOpen, 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Database, 
  Mail 
} from 'lucide-react';
// Import types naik satu level (keluar dari utils, masuk ke src)
import { NewsItem, BanomLembaga, Program, Asset } from '../types/types';

export const COLORS = {
  primary: '#166534', 
  secondary: '#ca8a04', 
};

export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: <Home size={18} /> },
  { name: 'Berita', path: '/news', icon: <Newspaper size={18} /> },
  { name: 'Artikel', path: '/articles', icon: <BookOpen size={18} /> },
  { name: 'Profil', path: '/profile', icon: <Users size={18} /> },
  { name: 'Program', path: '/programs', icon: <Calendar size={18} /> },
  { name: 'Dokumentasi', path: '/gallery', icon: <ImageIcon size={18} /> },
  { name: 'Aset', path: '/assets', icon: <Database size={18} /> },
  { name: 'Kontak', path: '/contact', icon: <Mail size={18} /> },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Pelantikan Pengurus Baru MWCNU Bungah Masa Khidmat 2024-2029',
    excerpt: 'Acara pelantikan berlangsung khidmat di Gedung Serbaguna Bungah dengan dihadiri oleh tokoh masyarakat.',
    content: 'Full content here...',
    category: 'Berita',
    author: 'Admin NU',
    date: '2024-05-20',
    imageUrl: 'https://picsum.photos/seed/nu1/800/400'
  },
  {
    id: '2',
    title: 'Pentingnya Menjaga Ukhuwah Islamiyah di Era Digital',
    excerpt: 'Artikel ini membahas bagaimana kader NU harus bersikap bijak dalam bermedia sosial.',
    content: 'Full content here...',
    category: 'Artikel',
    author: 'Kiai Ahmad',
    date: '2024-05-18',
    imageUrl: 'https://picsum.photos/seed/nu2/800/400'
  }
];

export const MOCK_PROFILES: BanomLembaga[] = [
  {
    id: 'b1',
    name: 'GP Ansor',
    type: 'Banom',
    description: 'Gerakan Pemuda Ansor adalah organisasi kepemudaan, kemasyarakatan, dan keagamaan.',
    leader: 'Sahabat Ahmad',
    logoUrl: 'https://picsum.photos/seed/ansor/200/200'
  },
  {
    id: 'l1',
    name: 'LAZISNU',
    type: 'Lembaga',
    description: 'Lembaga Amil Zakat, Infaq, dan Shadaqah Nahdlatul Ulama.',
    leader: 'H. Fauzi',
    logoUrl: 'https://picsum.photos/seed/lazisnu/200/200'
  }
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'a1',
    name: 'Gedung Kantor MWCNU Bungah',
    location: 'Jl. Raya Bungah No. 12',
    type: 'Bangunan',
    description: 'Pusat administrasi dan kegiatan organisasi.'
  },
  {
    id: 'a2',
    name: 'Tanah Wakaf Masjid Jami',
    location: 'Desa Bungah',
    type: 'Tanah',
    description: 'Tanah produktif untuk pengembangan ekonomi jamaah.'
  }
];