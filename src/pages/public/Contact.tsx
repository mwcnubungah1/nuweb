
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulating form submission
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Hubungi Kami</h1>
          <p className="text-slate-500 mb-12 text-lg">
            Ada pertanyaan, saran, atau ingin bergabung dalam kegiatan kami? Jangan ragu untuk menghubungi sekretariat atau kirimkan pesan melalui formulir ini.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 shrink-0">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Alamat Kantor</h4>
                <p className="text-slate-500">Jl. Raya Bungah No. 12, Kec. Bungah, Gresik, Jawa Timur</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 shrink-0">
                <Mail />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Email Resmi</h4>
                <p className="text-slate-500">sekretariat@nubungah.or.id</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 shrink-0">
                <Phone />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Telepon / WhatsApp</h4>
                <p className="text-slate-500">+62 812-3456-7890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                <Send size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Pesan Terkirim!</h2>
              <p className="text-slate-500">Terima kasih atas masukannya. Kami akan segera merespons pesan Anda.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Masukkan nama..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email / No. HP</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="example@mail.com"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Pesan / Kritik / Saran</label>
                <textarea 
                  required 
                  rows={5}
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-green-800 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg hover:shadow-green-200 transition-all flex items-center justify-center gap-2"
              >
                Kirim Pesan <Send size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
