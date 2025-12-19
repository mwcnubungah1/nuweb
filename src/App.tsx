import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout utama
import Layout from './components/Layout'; 

// Pages Public
import Home from './pages/public/Home';
import Profile from './pages/public/Profile';
import Assets from './pages/public/Assets';
import Contact from './pages/public/Contact';

// Pages Auth & Admin
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';

// Public layout wrapper (Tanpa AI Assistant)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
);

// Placeholder Components (Sementara)
const NewsView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Berita Terbaru</h1>
      <p className="text-slate-500">Halaman berita sedang dalam pengembangan.</p>
    </div>
  </PublicLayout>
);

const ArticleView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Artikel & Opini</h1>
      <p className="text-slate-500">Halaman artikel sedang dalam pengembangan.</p>
    </div>
  </PublicLayout>
);

const ProgramView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Program Kerja</h1>
      <p className="text-slate-500">Halaman program kerja sedang dalam pengembangan.</p>
    </div>
  </PublicLayout>
);

const GalleryView = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">Dokumentasi</h1>
      <p className="text-slate-500">Halaman galeri sedang dalam pengembangan.</p>
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