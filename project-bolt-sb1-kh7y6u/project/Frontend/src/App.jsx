import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Teams } from './pages/Teams';
import { Matches } from './pages/Matches';
import { History } from './pages/History';
import { Chat } from './pages/Chat';
import { Map } from './pages/Map';
import { AuthModal } from './components/auth/AuthModal';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, token, restoreSession } = useAuthStore();
  
  useEffect(() => {
    if (!user && token) {
      restoreSession();
    }
  }, [user, token, restoreSession]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const { user, token, restoreSession } = useAuthStore();

  useEffect(() => {
    if (!user && token) {
      restoreSession();
    }
  }, [user, token, restoreSession]);

  return (
    <Router>
      <div className="min-h-screen bg-navy-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthModal />} />
          <Route path="/equipos" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
          <Route path="/partidos" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/historial" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/mapa" element={<ProtectedRoute><Map /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;