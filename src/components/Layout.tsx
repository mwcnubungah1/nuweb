import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Calendar, FileText, Megaphone, Box, User, Phone, Home as HomeIcon } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // DEFINISI MENU NAVIGASI LANGSUNG DISINI
  // Agar sinkron dengan App.tsx yang baru kita perbaiki
  const navLinks = [
    { name: 'Beranda', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'Profil', path: '/profile', icon: <User size={18} /> },
    { name: 'Berita', path: '/berita', icon: <FileText size={18} /> },
    { name: 'Artikel', path: '/artikel', icon: <FileText size={18} /> },
    { name: 'Agenda', path: '/agenda', icon: <Calendar size={18} /> }, // Menu Agenda sudah ada
    { name: 'Pengumuman', path: '/pengumuman', icon: <Megaphone size={18} /> },
    { name: 'Data Aset', path: '/assets', icon: <Box size={18} /> },
    { name: 'Kontak', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-green-800 rounded-xl flex items-center justify-center text-white group-hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10">
                  <Leaf size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-green-900 leading-none">MWCNU</h1>
                  <p className="text-[10px] uppercase tracking-widest text-green-700 font-bold mt-0.5">Bungah - Gresik</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                    location.pathname === link.path || (location.pathname.startsWith(link.path) && link.path !== '/')
                      ? 'text-green-800 bg-green-50'
                      : 'text-slate-500 hover:text-green-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/login"
                className="ml-4 px-5 py-2.5 bg-green-800 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors flex items-center gap-3 ${
                    location.pathname === link.path
                      ? 'bg-green-50 text-green-800'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-green-700'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100 my-2" />
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 bg-green-800 text-white rounded-xl text-center font-bold"
              >
                Login Pengurus
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        {children}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
               <Leaf className="text-green-500" />
               <span className="text-2xl font-bold">MWCNU Bungah</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Majelis Wakil Cabang Nahdlatul Ulama Kecamatan Bungah, Kabupaten Gresik. 
              Berkhidmat untuk umat, merawat tradisi Ahlussunnah wal Jama'ah an-Nahdliyah.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'YouTube'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-700 text-white cursor-pointer transition-all">
                  <span className="text-xs font-bold">{social[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigasi Footer (Diperbaiki Linknya) */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Akses Cepat</h4>
            <ul className="space-y-3">
              <li><Link to="/berita" className="hover:text-green-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Berita Terkini</Link></li>
              <li><Link to="/agenda" className="hover:text-green-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Agenda Kegiatan</Link></li>
              <li><Link to="/profile" className="hover:text-green-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Struktur Organisasi</Link></li>
              <li><Link to="/assets" className="hover:text-green-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Data Aset</Link></li>
            </ul>
          </div>

          {/* Kontak Footer */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h4>
            <div className="space-y-4 text-slate-400">
              <p className="flex items-start gap-3">
                <span className="mt-1 text-green-500"><Box size={16}/></span>
                Jl. Raya Bungah No. 12<br />Kec. Bungah, Kab. Gresik<br />Jawa Timur
              </p>
              <p className="flex items-center gap-3">
                 <span className="text-green-500"><Phone size={16}/></span>
                 (031) 39XXXXX
              </p>
              <p className="flex items-center gap-3">
                 <span className="text-green-500">@</span>
                 admin@nubungah.or.id
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MWCNU Bungah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;