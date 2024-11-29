import { useState } from 'react';
import { X } from 'lucide-react';

export const CreateTeamModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    category: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the team data
    alert('Equipo creado exitosamente');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
          Crear Nuevo Equipo
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del equipo"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          
          <select
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={formData.sport}
            onChange={(e) => setFormData({...formData, sport: e.target.value})}
          >
            <option value="">Seleccionar deporte</option>
            <option value="futbol">Fútbol</option>
            <option value="baloncesto">Baloncesto</option>
          </select>
          
          <select
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="">Seleccionar categoría</option>
            <option value="juvenil">Juvenil</option>
            <option value="senior">Senior</option>
          </select>
          
          <input
            type="text"
            placeholder="Ubicación"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          
          <textarea
            placeholder="Descripción"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
          />
          
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
          >
            Crear Equipo
          </button>
        </form>
      </div>
    </div>
  );
};