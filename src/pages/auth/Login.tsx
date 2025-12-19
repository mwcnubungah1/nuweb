import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, AlertCircle } from 'lucide-react';
// PENTING: Import supabase client asli
// Sesuaikan path ini dengan lokasi file supabase.ts Anda
import { supabase } from '../../services/supabase'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Login sungguhan ke Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        throw authError;
      }

      // 2. Jika sukses, simpan penanda di localstorage (opsional, untuk UI saja)
      // Supabase otomatis menangani token/session di balik layar
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', data.user?.email || '');

      // 3. Redirect ke Admin
      navigate('/admin');

    } catch (err: any) {
      console.error("Login Error:", err);
      // Tampilkan pesan error yang lebih user-friendly
      setError(err.message === "Invalid login credentials" 
        ? "Email atau password salah." 
        : "Gagal login. Periksa koneksi internet Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-800 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
            <Leaf size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Admin Portal MWCNU
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Kecamatan Bungah - Gresik
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-[2rem] border border-slate-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 flex items-center gap-3 text-red-700 text-sm">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700">Email Address</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm bg-slate-50"
                  placeholder="admin@nubungah.or.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm bg-slate-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Sedang masuk...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-xs text-slate-400 hover:text-green-700 font-medium"
            >
              ← Kembali ke Beranda Publik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;