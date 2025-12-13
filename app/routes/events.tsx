import React, { useState } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay 
} from 'date-fns';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventCalendar() {
 
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); 
  
  
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 21));


  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

 
  const calendarDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[380px] bg-white rounded-[35px] shadow-2xl overflow-hidden pb-8 border border-gray-100">
        
    
        <div className="relative h-48 bg-gradient-to-br from-[#991b1b] to-[#ef4444] m-4 rounded-[20px] overflow-hidden shadow-lg group">
       
          <div className="absolute inset-0 opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1552674605-46d526d21860?w=800&q=80" 
              alt="Runner" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>

     
          <div className="relative z-10 p-5 text-white flex justify-between items-start h-full">
            <div className="flex flex-col">
              <span className="self-start text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-lg backdrop-blur-md border border-white/10">
                Running
              </span>
              <div className="mt-3">
                <p className="text-xs opacity-90 font-medium">Event Schedule</p>
                <h3 className="text-sm font-bold leading-snug mt-1">
                  Event Tanggal <br/> {format(selectedDate, 'dd MMMM yyyy')}
                </h3>
              </div>
            </div>
            <button className="text-white hover:text-red-200 transition active:scale-90">
              <Heart size={22} fill="rgba(255,255,255,0.2)" />
            </button>
          </div>
        </div>

        {/* --- 2. KALENDER BERSIH (PURE) --- */}
        <div className="px-6 mt-2">
          {/* Navigasi Bulan & Tahun */}
          <div className="flex justify-between items-center mb-6 px-1">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-900">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-900">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Nama Hari */}
          <div className="grid grid-cols-7 text-center mb-3">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Tanggal */}
          <div className="grid grid-cols-7 gap-y-1 place-items-center">
            {calendarDays.map((day, idx) => {
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    w-9 h-9 flex items-center justify-center rounded-full text-[13px] font-medium transition-all duration-300 relative
                    
                    /* 1. Jika bukan bulan ini, warnanya abu pudar */
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-600'}
                    
                    /* 2. Jika dipilih (Selected), warna Merah. Jika tidak, hover abu tipis */
                    ${isSelected 
                        ? 'bg-[#ef4444] text-white shadow-lg shadow-red-200 scale-105 z-10 font-bold' 
                        : 'hover:bg-gray-100'
                    }
                  `}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 3. DETAIL INFO (Opsional) --- */}
        <div className="px-6 mt-8 space-y-3">
          <div className="group border border-gray-200 rounded-[20px] px-6 py-4 text-sm text-gray-700 font-medium shadow-sm flex items-center justify-between bg-white">
          
            <span className="text-gray-600">
              Lihat jadwal untuk: <span className="text-red-600 font-bold">{format(selectedDate, 'dd/MM/yyyy')}</span>
            </span>
          </div>

          <div className="pt-4">
            <button className="w-full bg-[#2a0808] text-white h-14 rounded-full font-bold text-[10px] tracking-[0.25em] shadow-xl hover:bg-[#4a0f0f] transition-all active:scale-[0.98]">
              LIHAT DETAIL
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}