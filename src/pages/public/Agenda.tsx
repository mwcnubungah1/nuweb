import React, { useEffect, useState } from 'react';
import { Clock, MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { getPosts, Post } from '../../services/api';

const Agenda: React.FC = () => {
  const [events, setEvents] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const data = await getPosts('Agenda');
        setEvents(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgenda();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-green-600 font-bold tracking-wider text-sm uppercase">Jadwal Kegiatan</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">Agenda Organisasi</h1>
        <p className="text-slate-500">Jangan lewatkan kegiatan-kegiatan penting MWCNU Bungah.</p>
      </div>

      {loading ? (
        <p className="text-center text-slate-500">Memuat agenda...</p>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
           <CalendarDays className="mx-auto h-12 w-12 text-slate-300 mb-3" />
           <p className="text-slate-500">Belum ada agenda mendatang.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => {
            // Parsing tanggal (Fallback jika invalid)
            const dateObj = event.event_date ? new Date(event.event_date) : new Date();
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('id-ID', { month: 'short' });
            const year = dateObj.getFullYear();

            return (
              <div key={event.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-8 items-start group">
                <div className="shrink-0 w-full md:w-28 bg-green-50 rounded-2xl p-4 text-center text-green-800 border border-green-100 flex flex-col justify-center items-center">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-70">{month}</span>
                  <span className="text-4xl font-extrabold my-1">{day}</span>
                  <span className="text-xs font-medium opacity-80">{year}</span>
                </div>

                <div className="flex-1 w-full">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-green-700 transition-colors">
                    {event.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <Clock size={18} className="text-green-600" />
                      <span className="text-sm font-medium">{event.event_time || 'Waktu belum ditentukan'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <MapPin size={18} className="text-green-600" />
                      <span className="text-sm font-medium">{event.location || 'Lokasi belum ditentukan'}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {event.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Agenda;