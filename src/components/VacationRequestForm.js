import React, { useState, useEffect } from "react";

function VacationRequestForm({ onSubmit, onCancel, availableDays = 0 }) {
  const [formData, setFormData] = useState({
    inicio: "",
    fin: "",
    dias: 0,
  });

  const [error, setError] = useState("");

  //  Calcular automáticamente los días entre fechas
  useEffect(() => {
    if (formData.inicio && formData.fin) {
      const fechaInicio = new Date(formData.inicio);
      const fechaFin = new Date(formData.fin);
      if (fechaFin >= fechaInicio) {
        const diferencia = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24) + 1;
        setFormData((prev) => ({
          ...prev,
          dias: diferencia,
        }));
        setError("");
      } else {
        setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
        setFormData((prev) => ({ ...prev, dias: 0 }));
      }
    }
  }, [formData.inicio, formData.fin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { inicio, fin, dias } = formData;

    if (!inicio || !fin) {
      setError("Debes seleccionar las fechas de inicio y fin.");
      return;
    }

    // Validar exceso de días
    if (availableDays > 0 && dias > availableDays) {
      setError(
        `Estás solicitando ${dias} días, pero solo tienes ${availableDays} disponibles.`
      );
      return;
    }

    setError("");
    onSubmit(formData);
  };

  return (
    <div className="formulario-overlay">
      <div className="formulario">
        <h3>Solicitud de vacaciones</h3>

        <form onSubmit={handleSubmit}>
          <label>
            Fecha de inicio:
            <input
              type="date"
              name="inicio"
              value={formData.inicio}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Fecha de fin:
            <input
              type="date"
              name="fin"
              value={formData.fin}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Días a disfrutar (automático):
            <input type="number" value={formData.dias} disabled />
          </label>

          {/*  Mensaje visual de error */}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          {availableDays > 0 && (
            <p style={{ marginTop: "8px", color: "#004aad", fontSize: "14px" }}>
              Días disponibles: <strong>{availableDays}</strong>
            </p>
          )}

          <div className="acciones">
            <button type="submit">Enviar solicitud</button>
            <button
              type="button"
              className="cancelar"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VacationRequestForm;
