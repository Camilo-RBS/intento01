import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { X } from 'lucide-react';

export const AuthModal = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.state?.isRegistering);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    age: '',
    address: '',
    role: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  useEffect(() => {
    setIsLogin(!location.state?.isRegistering);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let success;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        // Get location before registration
        if (!navigator.geolocation) {
          setError('Tu navegador no soporta geolocalización');
          return;
        }

        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const registrationData = {
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };

          // Validate required fields
          const requiredFields = ['email', 'password', 'name', 'role'];
          const missingFields = requiredFields.filter(field => !registrationData[field]);
          
          if (missingFields.length > 0) {
            setError('Por favor completa todos los campos requeridos');
            return;
          }

          success = await register(registrationData);
        } catch (geoError) {
          setError('Por favor habilita la ubicación para registrarte');
          return;
        }
      }

      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || (isLogin ? 'Error al iniciar sesión' : 'Error en el registro'));
    }
  };

  const inputClasses = "w-full p-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[400px] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre *"
                className={inputClasses}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Apellido"
                className={inputClasses}
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              
              <input
                type="number"
                placeholder="Edad"
                className={inputClasses}
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Dirección"
                className={inputClasses}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              
              <select
                className={inputClasses}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              >
                <option value="">Elige tu Rol *</option>
                <option value="entrenador">Entrenador</option>
                <option value="jugador">Jugador</option>
              </select>

              <div className="text-sm text-gray-500">
                * Campos requeridos
              </div>
            </>
          )}
          
          <input
            type="email"
            placeholder="Correo *"
            className={inputClasses}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <input
            type="password"
            placeholder="Contraseña *"
            className={inputClasses}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-emerald-600 hover:text-emerald-700"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};