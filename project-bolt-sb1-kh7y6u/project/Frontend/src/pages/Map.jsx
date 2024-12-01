import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useApi } from '../hooks/useApi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const Map = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { fetchWithAuth } = useApi();
  const [users, setUsers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    courts: '',
    sport: '',
    role: ''
  });

  const getNearbyUsers = useCallback(async (position) => {
    try {
      const data = await fetchWithAuth(
        `/users/nearby?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`
      );
      setUsers(data);
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  }, [fetchWithAuth]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        getNearbyUsers(position);
      });
    }
  }, [getNearbyUsers]);

  const handleChatWithUser = (userId) => {
    navigate('/chat', { state: { selectedUserId: userId } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search with filters
  };

  if (!userLocation) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-white text-center">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Búsqueda de rival</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar Usuario..."
            className="flex-1 bg-gray-700 text-white rounded-md px-4 py-2"
          />
          <select
            value={filters.courts}
            onChange={(e) => setFilters({ ...filters, courts: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-4 py-2"
          >
            <option value="">Filtrar por Canchas</option>
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
          </select>
          <select
            value={filters.sport}
            onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-4 py-2"
          >
            <option value="">Filtrar por deporte</option>
            <option value="futbol">Fútbol</option>
            <option value="baloncesto">Baloncesto</option>
          </select>
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="bg-gray-700 text-white rounded-md px-4 py-2"
          >
            <option value="">Filtrar por ROL</option>
            <option value="jugador">Jugador</option>
            <option value="entrenador">Entrenador</option>
          </select>
          <button
            type="submit"
            className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <Marker 
              key={user._id} 
              position={[
                user.location.coordinates[1],
                user.location.coordinates[0]
              ]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm capitalize">{user.role}</p>
                  <button
                    onClick={() => handleChatWithUser(user._id)}
                    className="mt-2 bg-emerald-500 text-white px-4 py-1 rounded-md text-sm hover:bg-emerald-600"
                  >
                    Chatear
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};