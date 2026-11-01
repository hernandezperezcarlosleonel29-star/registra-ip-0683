import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recuperamos los datos del usuario al cargar el componente
    const datosGuardados = localStorage.getItem('registraIpUsuario');
    if (datosGuardados) {
      setUsuario(JSON.parse(datosGuardados));
    }
  }, []);

  const handleCerrarSesion = () => {
    // Borramos los datos del localStorage y regresamos al registro
    localStorage.removeItem('registraIpUsuario');
    navigate('/');
  };

  if (!usuario) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Panel de Control (Dashboard)</h2>
      <div className="card-bienvenida">
        <h3>¡Bienvenido(a), {usuario.nombre}! 👋</h3>
        <p><strong>Correo electrónico:</strong> {usuario.correo}</p>
        <p><strong>Tipo de creador:</strong> {usuario.tipoCreador}</p>
        <p className="fecha-info">Registrado el: {new Date(usuario.fechaRegistro).toLocaleDateString()}</p>
      </div>

      <button onClick={handleCerrarSesion} className="btn-logout">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;