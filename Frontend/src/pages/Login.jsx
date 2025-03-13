import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authenticationServices";
import { Logo } from "react-ecosistema-unp/ui";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(nombreUsuario, contraseña);
      // Redirige al Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas, intenta de nuevo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Logo type="entidad" variant="unp" color="rojo" />
            <h3 className="text-center mb-4">
                Iniciar sesión
            </h3>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            name="nombre_usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
};

export default Login;
