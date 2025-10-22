import React, { useState } from "react";
import EmployeeDashboard from "./EmployeeDashboard";

function ManagerDashboard({ user, onLogout }) {
  const [view, setView] = useState("subordinados");
  const [selectedSub, setSelectedSub] = useState(null);

  const validSubs = user.subordinados?.filter((id) => id !== user.cedula) || [];

  const handleViewChange = (option) => {
    setView(option);
    setSelectedSub(null);
  };

  const calculateSummary = (vacations) => {
    let totalDisfrutar = 0;
    let totalRestantes = 0;

    Object.values(vacations).forEach((periods) => {
      periods.forEach((p) => {
        totalDisfrutar += p.diasDisfrutar;
        totalRestantes += p.diasRestantes;
      });
    });

    const disfrutados = totalDisfrutar - totalRestantes;
    return { disfrutados, pendientes: totalRestantes };
  };

  return (
    <div className="dashboard">
      <header>
        <div>
          <h2>{user.name}</h2>
          <p>Rol: Jefe</p>
        </div>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>

      {/* Botones de vista */}
      <div className="manager-actions">
        <button
          className={view === "subordinados" ? "active" : ""}
          onClick={() => handleViewChange("subordinados")}
        >
          Ver subordinados
        </button>
        <button
          className={view === "personal" ? "active" : ""}
          onClick={() => handleViewChange("personal")}
        >
          Ver mis vacaciones
        </button>
      </div>

      {/* === Vista de subordinados === */}
      {view === "subordinados" && (
        <div className="manager-section">
          <h3>Subordinados</h3>

          {validSubs.length === 0 ? (
            <p>No hay subordinados registrados.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Días disfrutados</th>
                  <th>Días pendientes</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {validSubs.map((subCedula) => {
                  const sub = user.allEmployees?.[subCedula];
                  if (!sub) return null;
                  const resumen = calculateSummary(sub.vacations);
                  return (
                    <tr key={subCedula}>
                      <td>{subCedula}</td>
                      <td>{sub.name}</td>
                      <td>{resumen.disfrutados}</td>
                      <td>{resumen.pendientes}</td>
                      <td>
                        <button
                          className="details-btn"
                          onClick={() => {
                            setSelectedSub(sub);
                            setView("detalle");
                          }}
                        >
                          Ver más
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* === Vista detalle de un subordinado === */}
      {view === "detalle" && selectedSub && (
        <div className="manager-section">
          <button
            className="back-btn"
            onClick={() => handleViewChange("subordinados")}
          >
            ← Regresar
          </button>
          <h3>{selectedSub.name}</h3>
          <EmployeeDashboard
            user={selectedSub}
            onLogout={() => setSelectedSub(null)}
            isManagerView={true}
          />
        </div>
      )}

      {/* === Vista de vacaciones personales del jefe === */}
      {view === "personal" && (
        <div className="manager-section">
          <button
            className="back-btn"
            onClick={() => handleViewChange("subordinados")}
          >
            ← Regresar
          </button>
          <EmployeeDashboard user={user} onLogout={onLogout} hideHeader={true} />
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;

