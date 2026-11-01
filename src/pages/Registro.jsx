import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css'; // Estilos opcionales para el formulario

const Registro = () => {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoCreador, setTipoCreador] = useState('Diseñador');
  
  // Estado para manejar los mensajes de error de forma accesible
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación 1: Campos vacíos
    if (!nombre.trim() || !correo.trim()) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Validación 2: Formato de correo electrónico básico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // Si pasa las validaciones, limpiamos el error
    setError('');

    // Guardar los datos del usuario en el localStorage (Requerimiento de la práctica)
    const usuarioData = {
      nombre,
      correo,
      tipoCreador,
      fechaRegistro: new Date().toISOString()
    };
    localStorage.setItem('registraIpUsuario', JSON.stringify(usuarioData));

    // Redirigir al usuario hacia el Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="registro-container">
      <h2>Registro de Creador</h2>
      <p>Regístrate para acceder al panel de control de REGISTRA-IP.</p>

      <form onSubmit={handleSubmit} className="registro-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Carlos Hernandez"
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoCreador">Tipo de creador:</label>
          <select
            id="tipoCreador"
            value={tipoCreador}
            onChange={(e) => setTipoCreador(e.target.value)}
          >
            <option value="Diseñador">Diseñador</option>
            <option value="Fotógrafo">Fotógrafo</option>
            <option value="Escritor">Escritor</option>
            <option value="Cineasta">Cineasta</option>
          </select>
        </div>

        {/* Contenedor de errores accesible con aria-live="polite" */}
        <div aria-live="polite" className="error-container">
          {error && <p className="error-mensaje">{error}</p>}
        </div>

        <button type="submit" className="btn-submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;