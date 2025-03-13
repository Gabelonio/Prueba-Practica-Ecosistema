import { Logo } from "react-ecosistema-unp/ui";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const isAuthenticated =
    localStorage.getItem("access_token") && localStorage.getItem("user_token");

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <Logo type="entidad" variant="unp" color="rojo" />
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <p className="fs-5 text-secondary">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="btn btn-primary mt-3"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
