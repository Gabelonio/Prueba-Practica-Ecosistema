import { useState } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { TablaRegistros } from "react-ecosistema-unp/tables";
import { searchBeneficiarios } from "../services/beneficiariosServices";

const columns = [
  { label: "Cédula", key: "cedula" },
  { label: "Nombre", key: "nombre" },
  { label: "Dirección", key: "direccion" },
  { label: "Población", key: "poblacion" },
  { label: "Cantidad de chalecos", key: "total_chalecos" },
];

const BuscadorChalecos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchCedula, setSearchCedula] = useState("");
  const [searchNombre, setSearchNombre] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response = [];
      if (searchCedula) {
        response = await searchBeneficiarios("cedula", searchCedula);
      } else if (searchNombre) {
        response = await searchBeneficiarios("name", searchNombre);
      }
      setData(response.length ? response : []);
    } catch (err) {
      setError("No se encontraron resultados");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch} className="my-4">
        <Row className="g-3">
          <Col md={5}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por Cédula"
                value={searchCedula}
                onChange={(e) => {
                  setSearchCedula(e.target.value);
                  setSearchNombre("");
                }}
              />
            </Form.Group>
          </Col>

          <Col md={5}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por Nombre"
                value={searchNombre}
                onChange={(e) => {
                  setSearchNombre(e.target.value);
                  setSearchCedula("");
                }}
              />
            </Form.Group>
          </Col>

          <Col md={2} className="d-grid">
            <button variant="none" type="submit">
                Buscar
            </button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {data.length === 0 ? (
        <Alert variant="warning">Realiza una búsqueda</Alert>
      ) : (
        <TablaRegistros
          title="Conteo de Chalecos"
          subtitle="Beneficiarios registrados junto con la cantidad de chalecos que han recibido"
          columns={columns}
          data={data}
          isLoading={loading}
        />
      )}
    </>
  );
};

export default BuscadorChalecos;
