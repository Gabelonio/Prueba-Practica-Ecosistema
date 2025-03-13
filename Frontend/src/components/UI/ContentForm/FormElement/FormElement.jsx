import { Form } from "react-bootstrap";

const FormElement = ({ label, type, name, value, onChange, required = false }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={value} onChange={onChange} required={required} />
    </Form.Group>
  );
};

export default FormElement;