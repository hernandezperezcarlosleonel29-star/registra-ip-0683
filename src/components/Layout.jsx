import React from 'react';
import './Layout.css'; // Importaremos los estilos específicos para este componente

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Encabezado principal */}
      <header className="header-principal">
        <h1>REGISTRA-IP</h1>
        <p className="subtitulo">Sistema de Registro y Verificación de Autoría</p>
      </header>

      {/* Contenido dinámico (aquí irán las páginas como Registro o Dashboard) */}
      <main className="main-content">
        {children}
      </main>

      {/* Pie de página */}
      <footer className="footer-principal">
        <p>Práctica 2 - Diseño de Interfaces de Usuario</p>
      </footer>
    </div>
  );
};

export default Layout;