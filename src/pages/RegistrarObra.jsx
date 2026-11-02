import { generarCertificado } from '../utils/generarCertificado';
import React, { useState } from 'react';
import './RegistrarObra.css'; // O tus estilos personalizados

export default function RegistrarObra() {
  const [paso, setPaso] = useState(1);
  const [folioGenerado, setFolioGenerado] = useState('');

  // Estado unificado para conservar los datos entre los 4 pasos
  const [formData, setFormData] = useState({
    archivo: null,
    titulo: '',
    categoria: 'Pintura',
    descripcion: '',
    autor: 'Carlos Leonel' // Puedes ajustarlo o dejarlo fijo
  });

  // Manejador de cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador para el archivo subido en el paso 1
  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo: e.target.files[0] });
  };

  // Validaciones por paso según los requisitos de la práctica
  const esPasoValido = () => {
    if (paso === 1) {
      return formData.archivo !== null; // Requiere archivo seleccionado
    }
    if (paso === 2) {
      return formData.titulo.trim().length >= 5 && formData.categoria !== ''; // Título >= 5 caracteres y categoría
    }
    return true;
  };

  // Enviar datos al backend al llegar al paso final
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generación del folio personalizado (ejemplo con boleta simulada o últimos 4 dígitos)
    const folioPersonalizado = `OBRA-4321-${Math.floor(Math.random() * 900 + 100)}`;

    const dataToSend = new FormData();
    dataToSend.append('folio', folioPersonalizado);
    dataToSend.append('titulo', formData.titulo);
    dataToSend.append('categoria', formData.categoria);
    dataToSend.append('descripcion', formData.descripcion);
    dataToSend.append('autor', formData.autor);
    dataToSend.append('archivo', formData.archivo);

    try {
      const response = await fetch('http://localhost:4000/obras', {
        method: 'POST',
        body: dataToSend
      });

      const resultado = await response.json();
      if (response.ok) {
        setFolioGenerado(folioPersonalizado);
        setPaso(4); // Ir a confirmación final
      } else {
        alert('Error al registrar: ' + resultado.error);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor backend en el puerto 4000.');
    }
  };

  return (
    <div className="wizard-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Wizard de Registro de Obra</h2>

      {/* Barra de progreso visual */}
      <div className="progress-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {[1, 2, 3, 4].map((num) => (
          <div key={num} style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: paso >= num ? '#4f46e5' : '#e5e7eb',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {num}
          </div>
        ))}
      </div>

      {/* Paso 1: Subir archivo */}
      {paso === 1 && (
        <div>
          <h3>Paso 1: Subir Archivo de la Obra</h3>
          <input type="file" onChange={handleFileChange} />
          {formData.archivo && <p style={{ color: 'green' }}>Archivo seleccionado: {formData.archivo.name}</p>}
        </div>
      )}

      {/* Paso 2: Metadatos */}
      {paso === 2 && (
        <div>
          <h3>Paso 2: Metadatos de la Obra</h3>
          <div style={{ marginBottom: '10px' }}>
            <label>Título (mínimo 5 caracteres):</label><br />
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Categoría:</label><br />
            <select name="categoria" value={formData.categoria} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
              <option value="Pintura">Pintura</option>
              <option value="Escultura">Escultura</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Digital">Arte Digital</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Descripción:</label><br />
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          </div>
        </div>
      )}

      {/* Paso 3: Vista previa */}
      {paso === 3 && (
        <div>
          <h3>Paso 3: Vista Previa del Registro</h3>
          <p><strong>Título:</strong> {formData.titulo}</p>
          <p><strong>Categoría:</strong> {formData.categoria}</p>
          <p><strong>Descripción:</strong> {formData.descripcion}</p>
          <p><strong>Autor:</strong> {formData.autor}</p>
          <p><strong>Archivo:</strong> {formData.archivo ? formData.archivo.name : 'Ninguno'}</p>
        </div>
      )}

      {/* Paso 4: Confirmación */}
      <button 
  onClick={() => generarCertificado({
    titulo: formData.titulo,
    categoria: formData.categoria,
    descripcion: formData.descripcion,
    autor: formData.autor,
    folio: folioGenerado
  })}
  style={{ 
    marginTop: '15px', 
    padding: '10px 20px', 
    background: '#4f46e5', 
    color: '#fff', 
    borderRadius: '5px', 
    border: 'none', 
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
  Descargar Certificado PDF
</button>
      
      {paso === 4 && (
        <div>
          <h3>Paso 4: ¡Registro Exitoso!</h3>
          <p style={{ color: 'green', fontWeight: 'bold' }}>Tu obra se ha registrado correctamente en el servidor.</p>
          <p>Folio generado: <strong>{folioGenerado}</strong></p>
        </div>
        
      )}

      {/* Botones de navegación */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {paso > 1 && paso < 4 && (
          <button onClick={() => setPaso(paso - 1)} style={{ padding: '10px 20px' }}>
            Atrás
          </button>
        )}
        
        {paso < 3 && (
          <button 
            onClick={() => setPaso(paso + 1)} 
            disabled={!esPasoValido()} 
            style={{ padding: '10px 20px', opacity: esPasoValido() ? 1 : 0.5 }}
          >
            Siguiente
          </button>
        )}

        {paso === 3 && (
          <button onClick={handleSubmit} style={{ padding: '10px 20px', background: '#10b981', color: '#white' }}>
            Confirmar y Guardar
          </button>
        )}
      </div>
    </div>
  );
}