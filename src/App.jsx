import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import RutaProtegida from './components/RutaProtegida';
import './App.css';
import RegistrarObra from './pages/RegistrarObra';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>

<Route path="/registrar" element={<RegistrarObra />} />

          {/* Ruta pública para el registro */}
          <Route path="/" element={<Registro />} />

          {/* Ruta protegida para el panel de control */}
          <Route 
            path="/dashboard" 
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } 
            
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;