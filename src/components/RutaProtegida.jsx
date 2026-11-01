import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  // Verificamos si existe el usuario guardado en el localStorage
  const usuario = localStorage.getItem('registraIpUsuario');

  // Si no hay sesión activa, redirigimos al registro
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Si sí hay sesión, permitimos ver el contenido protegido
  return children;
};

export default RutaProtegida;