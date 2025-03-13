import { useEffect, useState } from "react";
import { addChaleco } from "../../services/chalecosServices";
import { getAllBeneficiariosOpciones } from "../../services/beneficiariosServices";
import { CustomModal } from "react-ecosistema-unp/ui";
import ContentForm from "../UI/ContentForm/ContentForm";
import FormElement from "../UI/ContentForm/FormElement/FormElement";
import FormSelect from "../UI/ContentForm/FormSelect/FormSelect";

const AddBeneficiarioModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    serial: "",
    beneficiario_cedula: "",
  });

  const [beneficiarios, setBeneficiarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = (await getAllBeneficiariosOpciones()).data;
        setBeneficiarios(data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || "Error desconocido");
        } else {
          setError("Error de conexión con el servidor");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBeneficiarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const beneficiarioEncontrado = beneficiarios.find(
        (b) => b.cedula == formData.beneficiario_cedula
      );
      await addChaleco(formData);
      handleSave({
        ...formData,
        beneficiario_nombre: beneficiarioEncontrado ? beneficiarioEncontrado.nombre : "Desconocido",

      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error desconocido");
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      show={show}
      onHide={handleClose}
      title="Agregar Chaleco"
      closeModalOut={true}
    >
      <ContentForm handleSubmit={handleSubmit} error={error} loading={loading}>
        <FormElement
          label="Serial"
          type="number"
          name="serial"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
        <FormSelect
          label="Beneficiario"
          name="beneficiario_cedula"
          value={formData.beneficiario}
          defaultValue="Seleccione un beneficiario"
          onChange={handleChange}
          options={beneficiarios}
          singleOption={(element) => (
            <option key={element.cedula} value={element.cedula}>
              {element.nombre} ({element.cedula})
            </option>
          )}
          required
        />
      </ContentForm>
    </CustomModal>
  );
};

export default AddBeneficiarioModal;
