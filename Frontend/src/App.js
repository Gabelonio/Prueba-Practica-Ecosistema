import "./App.css";
import { UserRoute } from "react-ecosistema-unp/utils";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import NotAllowedPage from "./pages/NotAllowedPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./pages/DashboardLayout";
import Beneficiarios from "./pages/Beneficiarios";
import Chalecos from "./pages/Chalecos";
import BuscadorChalecos from "./pages/BuscadorChalecos";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Login />} />
          {/* Página de acceso denegado */}
          <Route
            path="/sistema/pagina-no-permitida"
            element={<NotAllowedPage />}
          />
          {/* Ruta protegida DASHBOARD */}
          <Route path="/dashboard" element={<UserRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Navigate to="beneficiarios" replace />} />
              <Route path="beneficiarios" element={<Beneficiarios />} />
              <Route path="chalecos" element={<Chalecos />} />
              <Route path="buscador-chalecos" element={<BuscadorChalecos />} />
            </Route>
          </Route>
          {/* Página no encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
