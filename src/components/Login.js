import React, { useState } from "react";

function Login({ onLogin }) {
  const [cedula, setCedula] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cedula.trim()) {
      alert("Por favor ingresa tu cédula.");
      return;
    }
    onLogin(cedula.trim());
  };

  return (
    <div className="login-container">
      <h1>Vacaciones del Personal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa tu cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
