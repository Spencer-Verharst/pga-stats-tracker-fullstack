import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayerDetail from './pages/PlayerDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">
              PGA Stats Tracker
            </h1>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}