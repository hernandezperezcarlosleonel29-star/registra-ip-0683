import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generarCertificado = async (obraData) => {
  const doc = new jsPDF();

  // 1. Título principal (Jerarquía tipográfica grande)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Certificado de Registro de Autoría", 105, 30, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("REGISTRA-IP — UPIICSA", 105, 40, { align: "center" });

  // Línea divisoria estética
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // 2. Metadatos de la obra (Cuerpo con tamaño menor)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Detalles de la Obra Registrada:", 20, 65);
  
  doc.setFont("helvetica", "normal");
  doc.text(`Título: ${obraData.titulo || "Sin título"}`, 20, 75);
  doc.text(`Categoría: ${obraData.categoria || "N/A"}`, 20, 85);
  doc.text(`Descripción: ${obraData.descripcion || "Sin descripción"}`, 20, 95);
  doc.text(`Autor original: ${obraData.autor || "Carlos Leonel"}`, 20, 105);
  doc.text(`Fecha de registro: ${new Date().toLocaleDateString()}`, 20, 115);

  // 3. Folio personalizado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Folio Oficial: ${obraData.folio || "OBRA-4321-001"}`, 20, 130);

  // 4. Personalización obligatoria
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Registrado por: Carlos Leonel Hernandez Perez", 20, 145);

  // 5. Generación e inserción del Código QR a partir del folio
  try {
    const textoQR = obraData.folio || "OBRA-4321-001";
    const qrDataUrl = await QRCode.toDataURL(textoQR);
    
    // Insertar la imagen del QR en el PDF (coordenadas X, Y, ancho, alto)
    doc.addImage(qrDataUrl, 'PNG', 130, 65, 55, 55);
    
    doc.setFontSize(9);
    doc.text("Escanea para verificar autenticidad", 157, 127, { align: "center" });
  } catch (error) {
    console.error("Error al generar el código QR:", error);
  }

  // 6. Descarga automática del archivo PDF
  doc.save(`certificado-${obraData.folio || "obra"}.pdf`);
};