import React, { useState, useEffect } from 'react';
import { generarCertificado } from '../utils/generarCertificado';

export default function Galeria() {
  const [obras, setObras] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [orden, setOrden] = useState('recientes');
  const [loading, setLoading] = useState(true); // Criterio ISO 9241: Retroalimentación visual
  const [obraSeleccionada, setObraSeleccionada] = useState(null); // Para la vista de detalle / modal

  // Cargar obras del servidor al montar el componente
  useEffect(() => {
    fetch('http://localhost:4000/api/obras')
      .then((res) => res.json())
      .then((data) => {
        setObras(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar obras:', err);
        setLoading(false);
      });
  }, []);

  // Lógica de filtrado y búsqueda combinada
  const obrasFiltradas = obras.filter((obra) => {
    const textoMatch = 
      obra.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
      obra.autor.toLowerCase().includes(busqueda.toLowerCase());
    
    const categoriaMatch = categoriaFiltro === 'Todas' || obra.categoria === categoriaFiltro;

    return textoMatch && categoriaMatch;
  }).sort((a, b) => {
    const fechaA = new Date(a.fecha || Date.now());
    const fechaB = new Date(b.fecha || Date.now());
    return orden === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Galería de Obras Registradas</h1>
      <p>Explora, busca y filtra las creaciones registradas en el sistema REGISTRA-IP.</p>

      {/* Controles de Búsqueda y Filtros */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', margin: '20px 0' }}>
        <input 
          type="text"
          placeholder="Buscar por título o autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', flex: '1', minWidth: '220px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <select 
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Diseño">Diseño</option>
          <option value="Fotografía">Fotografía</option>
          <option value="Escritura">Escritura</option>
          <option value="Cine">Cine</option>
        </select>

        <select 
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="recientes">Más recientes primero</option>
          <option value="antiguas">Más antiguas primero</option>
        </select>
      </div>

      {/* Criterio ISO 9241-110: Retroalimentación visual (Loader) */}
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>Cargando obras del servidor...</p>
      ) : obrasFiltradas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No se encontraron obras con esos criterios.</p>
      ) : (
        /* Grid Responsivo (CSS Grid) */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {obrasFiltradas.map((obra, index) => (
            <div 
              key={index}
              onClick={() => setObraSeleccionada(obra)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                background: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#4f46e5' }}>{obra.titulo}</h3>
              <p style={{ margin: '5px 0' }}><strong>Autor:</strong> {obra.autor}</p>
              <p style={{ margin: '5px 0' }}><strong>Categoría:</strong> {obra.categoria}</p>
              <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}><strong>Folio:</strong> {obra.folio}</p>
            </div>
          ))}
        </div>
      )}

      {/* Vista de Detalle / Modal */}
      {obraSeleccionada && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '450px', maxWidth: '90%' }}>
            <h2>{obraSeleccionada.titulo}</h2>
            <p><strong>Categoría:</strong> {obraSeleccionada.categoria}</p>
            <p><strong>Descripción:</strong> {obraSeleccionada.descripcion || 'Sin descripción'}</p>
            <p><strong>Autor original:</strong> {obraSeleccionada.autor}</p>
            <p><strong>Folio oficial:</strong> {obraSeleccionada.folio}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              {/* Criterio ISO 9241-9: Área mínima táctil de 44x44px en elementos interactivos */}
              <button 
                onClick={() => generarCertificado(obraSeleccionada)}
                style={{
                  minWidth: '44px',
                  minHeight: '44px',
                  padding: '10px 15px',
                  backgroundColor: '#4f46e5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Descargar Certificado PDF
              </button>

              <button 
                onClick={() => setObraSeleccionada(null)}
                style={{
                  minWidth: '44px',
                  minHeight: '44px',
                  padding: '10px 15px',
                  backgroundColor: '#e5e7eb',
                  color: '#333',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}