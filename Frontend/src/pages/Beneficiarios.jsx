import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { TablaRegistros } from "react-ecosistema-unp/tables";
import { getAllBeneficiarios } from "../services/beneficiariosServices";
import AddBeneficiarioModal from "../components/AddBeneficiarioModal/AddBeneficiarioModal";

const columns = [
  { label: "ID", key: "cedula" },
  { label: "Nombre", key: "nombre" },
  { label: "Dirección", key: "direccion" },
  { label: "Población", key: "poblacion" },
];

const Beneficiarios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBeneficiarios();
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error)
    return (
      error && (
        <Alert variant="danger">
          Error cargando datos de Beneficiarios: {error.message}
        </Alert>
      )
    );

  const handleSave = (newBeneficiario) => {
    setData([...data, newBeneficiario]);
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-start my-4">
        <button variant="none" onClick={() => setShowModal(true)}>
          Agregar Beneficiario
        </button>
      </div>
      {showModal && (
        <AddBeneficiarioModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
        />
      )}
      <TablaRegistros
        title="Beneficiarios"
        subtitle="Beneficiarios registrados"
        columns={columns}
        data={data}
        isLoading={loading}
      />
    </>
  );
};

export default Beneficiarios;
