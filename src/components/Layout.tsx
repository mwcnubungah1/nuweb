
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { NAV_LINKS } from "../utils/constants";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white">
                  <Leaf size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-900 leading-tight">MWCNU</h1>
                  <p className="text-[10px] uppercase tracking-widest text-green-700 font-bold">Bungah - Gresik</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-green-800 bg-green-50'
                      : 'text-slate-600 hover:text-green-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-green-800"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-green-800 hover:bg-green-50"
                >
                  <div className="flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">MWCNU Bungah</h3>
            <p className="text-slate-400 mb-4 max-w-md">
              Majelis Wakil Cabang Nahdlatul Ulama Kecamatan Bungah, Kabupaten Gresik. 
              Berkomitmen menjaga tradisi Islam Ahlussunnah wal Jama'ah dan membangun kemandirian ekonomi umat.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholder */}
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-700 cursor-pointer transition-colors">f</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-700 cursor-pointer transition-colors">ig</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-700 cursor-pointer transition-colors">yt</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link to="/news" className="hover:text-green-500 transition-colors">Berita Utama</Link></li>
              <li><Link to="/profile" className="hover:text-green-500 transition-colors">Profil Banom</Link></li>
              <li><Link to="/programs" className="hover:text-green-500 transition-colors">Program Kerja</Link></li>
              <li><Link to="/assets" className="hover:text-green-500 transition-colors">Data Aset</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <p className="text-slate-400">
              Jl. Raya Bungah No. 12<br />
              Kec. Bungah, Kab. Gresik<br />
              Jawa Timur, Indonesia<br />
              <span className="block mt-2">Email: admin@nubungah.or.id</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>© {new Date().getFullYear()} MWCNU Bungah. Powered by Santri IT Bungah.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
