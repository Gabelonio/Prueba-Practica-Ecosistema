import { useState } from "react";
import { CustomModal } from "react-ecosistema-unp/ui";
import { addBeneficiario } from "../../services/beneficiariosServices";
import ContentForm from "../UI/ContentForm/ContentForm";
import FormElement from "../UI/ContentForm/FormElement/FormElement";

const AddBeneficiarioModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    direccion: "",
    poblacion: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await addBeneficiario(formData);
      handleSave(formData);
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
    <CustomModal show={show} onHide={handleClose} title="Agregar Beneficiario" closeModalOut = {true}>
      <ContentForm handleSubmit={handleSubmit} error={error} loading={loading}>
        <FormElement label="Cédula" type="number" name="cedula" value={formData.cedula} onChange={handleChange} required />
        <FormElement label="Nombre" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <FormElement label="Dirección" type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
        <FormElement label="Población" type="text" name="poblacion" value={formData.poblacion} onChange={handleChange} required />
      </ContentForm>
    </CustomModal>
  );
};

export default AddBeneficiarioModal;
