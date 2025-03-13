import { Link, Outlet, useNavigate } from "react-router-dom";
import { ContenedorVentana } from "react-ecosistema-unp/ui";
import { Encabezado } from "react-ecosistema-unp/ui";
import { logout } from "../services/authenticationServices"; 

const DashboardLayout = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Llamar a la función de logout
    navigate("/");
  };

  return (
    <ContenedorVentana>
      <Encabezado title="Dashboard" subtitle="Panel de administración" />
      <nav style={{ display: "flex", gap: "20px", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="beneficiarios">Beneficiarios</Link>
        <Link to="chalecos">Chalecos</Link>
        <Link to="buscador-chalecos">Buscador de Chalecos</Link>
        <Link to="/" onClick={handleLogout}>
          Cerrar Sesión
        </Link>
      </nav>
      <div className="dashboard-content">
        <Outlet /> {/* Renderiza la ruta activa */}
      </div>
    </ContenedorVentana>
  );
};

export default DashboardLayout;