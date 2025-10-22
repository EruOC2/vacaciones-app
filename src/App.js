import React, { useState } from "react";
import "./styles.css";
import Login from "./components/Login";
import { vacationsData } from "./data/vacationsData";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";

function App() {
  const [user, setUser] = useState(null);

  //  Inicia sesión detectando automáticamente el rol según la cédula
  const handleLogin = (cedula) => {
    const data = vacationsData[cedula];
    if (!data) {
      alert("❌ Cédula no encontrada");
      return;
    }
    setUser({ ...data, cedula });
  };

  //  Cerrar sesión
  const handleLogout = () => setUser(null);

  //  Renderizado condicional según rol
  return (
    <div className="app-container">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user.role === "jefe" ? (
        <ManagerDashboard user={user} onLogout={handleLogout} />
      ) : (
        <EmployeeDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
