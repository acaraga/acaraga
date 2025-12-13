
import { Search, MapPin, Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
  category: string;
  image: string;
}

// --- Dummy Data ---
const EVENTS: EventData[] = [
  {
    id: 1,
    title: "Jakarta City Marathon",
    date: "Minggu, 22 Desember 2025",
    location: "GBK, Jakarta",
    price: "Rp 350.000",
    category: "Running",
    image: "https://images.unsplash.com/photo-1552674605-46d536d2e609?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Bromo Fun Bike",
    date: "Sabtu, 15 Jan 2026",
    location: "Bromo, Jawa Timur",
    price: "Rp 450.000",
    category: "Cycling",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Smash Open Tournament",
    date: "Jumat, 12 Feb 2026",
    location: "GOR Kertajaya, Surabaya",
    price: "Rp 250.000",
    category: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-847890e05851?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Smash Open Tournament",
    date: "Jumat, 12 Feb 2026",
    location: "GOR Kertajaya, Surabaya",
    price: "Rp 250.000",
    category: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-847890e05851?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Smash Open Tournament",
    date: "Jumat, 12 Feb 2026",
    location: "GOR Kertajaya, Surabaya",
    price: "Rp 250.000",
    category: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-847890e05851?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Smash Open Tournament",
    date: "Jumat, 12 Feb 2026",
    location: "GOR Kertajaya, Surabaya",
    price: "Rp 250.000",
    category: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-847890e05851?auto=format&fit=crop&q=80&w=800"
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="w-full bg-[#f3f4f6] py-4 px-6 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
      <span className="text-xl font-bold text-gray-800">Acaraga</span>
    </div>
    
    <div className="hidden md:flex gap-8 text-gray-600 font-medium">
      <a href="#" className="hover:text-blue-600 transition">Home</a>
      <a href="#" className="text-blue-600">Event</a>
      <a href="#" className="hover:text-blue-600 transition">About</a>
    </div>

    <div className="flex gap-3">
      <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">Login</button>
      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Register</button>
    </div>
  </nav>
);

const FilterBar = () => (
  <div className="bg-white p-2 rounded-xl shadow-md flex flex-col md:flex-row gap-2 max-w-4xl mx-auto mt-8 border border-gray-100">
    <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-lg">
      <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input 
        type="text" 
        placeholder="Search event" 
        className="bg-transparent w-full py-3 outline-none text-gray-700 text-sm"
      />
    </div>
    
    <div className="flex-1 flex items-center justify-between px-4 bg-gray-50 rounded-lg cursor-pointer border-l-0 md:border-l border-gray-200">
      <span className="text-gray-500 text-sm">All Sports</span>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>

    <div className="flex-1 flex items-center justify-between px-4 bg-gray-50 rounded-lg cursor-pointer border-l-0 md:border-l border-gray-200">
      <span className="text-gray-500 text-sm">Location</span>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>

    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
      Apply
    </button>
  </div>
);

const EventCard = ({ event }: { event: EventData }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
    {/* Image Section */}
    <div className="relative h-48 w-full">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
        {event.category}
      </span>
    </div>

    {/* Content Section */}
    <div className="p-5 flex flex-col flex-1">
      <p className="text-blue-500 text-xs font-semibold mb-2">{event.date}</p>
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
      
      <div className="flex items-center text-gray-500 text-sm mb-6">
        <MapPin className="w-4 h-4 mr-1" />
        {event.location}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="font-bold text-gray-900">{event.price}</span>
        <button className="px-4 py-1.5 rounded-full border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
          Detail
        </button>
      </div>
    </div>
  </div>
);

const Pagination = () => (
  <div className="flex items-center justify-center gap-2 mt-12 mb-8">
    <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 text-gray-500 disabled:opacity-50">
      <ChevronLeft className="w-4 h-4" />
    </button>
    <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-medium">1</button>
    <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">2</button>
    <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const Footer = () => (
  <footer className="bg-black text-white py-6 text-center text-sm text-gray-400">
    © 2025 Acaraga Indonesia. All rights reserved.
  </footer>
);

// --- Main App Component ---
function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Jelajahi Event Olahraga
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Temukan kompetisi yang menantang atau acara komunitas yang menyenangkan di sekitarmu.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-12">
          <FilterBar />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </main>

      <Footer />
    </div>
  );
}

export default App;