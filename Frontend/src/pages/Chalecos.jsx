import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { TablaRegistros } from "react-ecosistema-unp/tables";
import { getAllChalecos } from "../services/chalecosServices";
import AddChalecoModal from "../components/AddChalecoModal/AddChalecoModal";

const columns = [
    { label: "Serial", key: "serial" },
    { label: "Cedula Beneficiario", key: "beneficiario_cedula" },
    { label: "Nombre Beneficiario", key: "beneficiario_nombre" }
  ];

const Chalecos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllChalecos();
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
    return error && <Alert variant="danger">Error cargando datos de Chalecos: {error.message}</Alert>

  const handleSave = (newChaleco) => {
    setData([...data, newChaleco]);
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-start my-4">
        <button
            variant="none"
            onClick={() => setShowModal(true)}
        >
            Agregar Chaleco
        </button>
      </div>
      {showModal && (
        <AddChalecoModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
        />
      )}
      <TablaRegistros
        title="Chalecos"
        subtitle="Chalecos registrados"
        columns={columns}
        data={data}
        isLoading={loading}
      />
    </>
  );
};

export default Chalecos;
