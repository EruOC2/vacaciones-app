import React, { useState } from "react";
import { jsPDF } from "jspdf";
import VacationRequestForm from "./VacationRequestForm";

function EmployeeDashboard({ user, onLogout, isManagerView = false, hideHeader = false }) {
  const { cedula, name, vacations } = user;
  const [showForm, setShowForm] = useState(false);

  //  Calcular totales de cada año
  const calculateTotals = (periods) => {
    const totalDisfrutar = periods.reduce((acc, p) => acc + p.diasDisfrutar, 0);
    const totalRestantes = periods.reduce((acc, p) => acc + p.diasRestantes, 0);
    const totalDisfrutados = totalDisfrutar - totalRestantes;
    return { totalDisfrutar, totalDisfrutados, totalRestantes };
  };

  //  Generar el PDF (solo si la solicitud es válida)
  const generarMemoPDF = (data) => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(18);
    doc.text("INSTITUTO MEXICANO DEL SEGURO SOCIAL", 20, 20);
    doc.setFontSize(14);
    doc.text("MEMORÁNDUM DE SOLICITUD DE VACACIONES", 20, 35);

    // Datos del empleado
    doc.setFontSize(12);
    doc.text(`Empleado: ${name}`, 20, 55);
    doc.text(`Cédula: ${cedula}`, 20, 63);
    doc.text(`Fecha de solicitud: ${new Date().toLocaleDateString()}`, 20, 71);

    // Datos de la solicitud
    doc.text("Detalles de la solicitud:", 20, 90);
    doc.text(`Fecha de inicio: ${data.inicio}`, 30, 100);
    doc.text(`Fecha de fin: ${data.fin}`, 30, 108);
    doc.text(`Total de días solicitados: ${data.dias}`, 30, 116);

    // Firma
    doc.text("Atentamente,", 20, 140);
    doc.text(`${name}`, 20, 148);
    doc.text(`Cédula: ${cedula}`, 20, 156);

    // Pie de página
    doc.setFontSize(10);
    doc.text("Este documento fue generado automáticamente.", 20, 275);

    // Guardar PDF
    doc.save(`MEMO-VACACIONES-${cedula}-${Date.now()}.pdf`);
  };

  // 🔹 Manejar envío del formulario
  const handleRequestSubmit = (data) => {
    // Tomar los días disponibles del primer periodo con días restantes
    const diasDisponibles = Object.values(vacations)
      .flat()
      .reduce((acc, p) => acc + p.diasRestantes, 0);

    if (data.dias > diasDisponibles) {
      alert(
        `Error : estás solicitando ${data.dias} días, pero solo tienes ${diasDisponibles} disponibles.`
      );
      setShowForm(false);
      return; //  Cancela la solicitud y no genera el PDF
    }

    generarMemoPDF(data);
    alert("Solicitud enviada y memo PDF generado correctamente ✅");
    setShowForm(false);
  };

  return (
    <div className="dashboard">
      {/* Mostrar encabezado solo si no está oculto */}
      {!hideHeader && (
        <header>
          <div>
            <h2>{name}</h2>
            <p>Cédula: {cedula}</p>
          </div>
          {!isManagerView && <button onClick={onLogout}>Cerrar sesión</button>}
        </header>
      )}

      <h3>Vacaciones</h3>

      {Object.entries(vacations).map(([year, periods]) => {
        const totals = calculateTotals(periods);

        return (
          <div key={year} className="year-section">
            <h4>{year}</h4>

            <div className="summary">
              <p>
                <strong>Total días asignados:</strong> {totals.totalDisfrutar}
              </p>
              <p>
                <strong>Disfrutados:</strong> {totals.totalDisfrutados}
              </p>
              <p>
                <strong>Pendientes por disfrutar:</strong>{" "}
                {totals.totalRestantes}
              </p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Periodo</th>
                  <th>Días para disfrutar</th>
                  <th>Días solicitados</th>
                  <th>Fecha de disfrute</th>
                  <th>Ref MEMO</th>
                  <th>Fecha MEMO</th>
                  <th>Días restantes</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.periodo}</td>
                    <td>{p.diasDisfrutar}</td>
                    <td>{p.diasSolicitados}</td>
                    <td>{p.fechaDisfrute}</td>
                    <td>{p.refMemo}</td>
                    <td>{p.fechaMemo}</td>
                    <td>{p.diasRestantes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

      {/* Botón de solicitud solo si aplica */}
      {!isManagerView && !hideHeader && !showForm && (
        <button onClick={() => setShowForm(true)} className="boton">
          Solicitar vacaciones
        </button>
      )}

      {showForm && (
        <VacationRequestForm
          onSubmit={handleRequestSubmit}
          onCancel={() => setShowForm(false)}
          availableDays={Object.values(vacations)[0]?.[0]?.diasRestantes || 0}
        />
      )}
    </div>
  );
}

export default EmployeeDashboard;
