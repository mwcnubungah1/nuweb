import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; 
import Home from './pages/public/Home';
import Profile from './pages/public/Profile';
import Contact from './pages/public/Contact';
import Articles from './pages/public/Articles'; 
import Agenda from './pages/public/Agenda';
import Announcements from './pages/public/Announcements';
import Assets from './pages/public/Assets';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        {/* Route Berita & Artikel menggunakan komponen yang sama */}
        <Route path="/berita" element={<PublicLayout><Articles category="Berita" /></PublicLayout>} />
        <Route path="/artikel" element={<PublicLayout><Articles category="Artikel" /></PublicLayout>} />
        <Route path="/agenda" element={<PublicLayout><Agenda /></PublicLayout>} />
        <Route path="/pengumuman" element={<PublicLayout><Announcements /></PublicLayout>} />
        <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />
        <Route path="/assets" element={<PublicLayout><Assets /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;