import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { X } from 'lucide-react';

export const AuthModal = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.state?.isRegistering);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    edad: '',
    direccion: '',
    rol: ''
  });

  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  useEffect(() => {
    setIsLogin(!location.state?.isRegistering);
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (login(formData.email, formData.password)) {
        navigate('/');
      } else {
        alert('Credenciales inválidas');
      }
    } else {
      alert('Registro exitoso');
      setIsLogin(true);
    }
  };

  const inputClasses = "w-full p-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[400px] relative">
        <button
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                className={inputClasses}
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Apellido"
                className={inputClasses}
                value={formData.apellido}
                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
              />
              
              <input
                type="number"
                placeholder="Edad"
                className={inputClasses}
                value={formData.edad}
                onChange={(e) => setFormData({...formData, edad: e.target.value})}
              />
              
              <input
                type="text"
                placeholder="Dirección"
                className={inputClasses}
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              />
              
              <select
                className={inputClasses}
                value={formData.rol}
                onChange={(e) => setFormData({...formData, rol: e.target.value})}
              >
                <option value="">Elige tu Rol</option>
                <option value="entrenador">Entrenador</option>
                <option value="jugador">Jugador</option>
              </select>
            </>
          )}
          
          <input
            type="email"
            placeholder="Correo"
            className={inputClasses}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            className={inputClasses}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500 transition-colors"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 hover:text-emerald-700"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};