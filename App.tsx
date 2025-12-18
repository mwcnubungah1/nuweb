
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AIAssistant from './components/AIAssistant';
import Home from './views/Home';
import Profile from './views/Profile';
import Assets from './views/Assets';
import Contact from './views/Contact';
import Login from './views/Login';
import Dashboard from './views/admin/Dashboard';

// Public layout wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Layout>{children}</Layout>
    <AIAssistant />
  </>
);

const NewsView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Berita Terbaru</h1>
      <p className="text-slate-500">Daftar berita lengkap akan ditampilkan di sini.</p>
    </div>
  </PublicLayout>
);

const ArticleView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Artikel & Opini</h1>
      <p className="text-slate-500">Ruang literasi dan pemikiran warga NU Bungah.</p>
    </div>
  </PublicLayout>
);

const ProgramView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Program Kerja</h1>
      <p className="text-slate-500">Transparansi program kerja tahunan MWCNU Bungah.</p>
    </div>
  </PublicLayout>
);

const GalleryView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Dokumentasi Kegiatan</h1>
      <p className="text-slate-500">Galeri foto dan video kegiatan rutin organisasi.</p>
    </div>
  </PublicLayout>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/news" element={<NewsView />} />
        <Route path="/articles" element={<ArticleView />} />
        <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />
        <Route path="/programs" element={<ProgramView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/assets" element={<PublicLayout><Assets /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
