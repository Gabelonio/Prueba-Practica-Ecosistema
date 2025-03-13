import { Form } from "react-bootstrap";

const FormSelect = ({
  label,
  name,
  value,
  defaultValue,
  onChange,
  required = false,
  options = [],
  singleOption,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{defaultValue}</option>
        {options.map((element) =>
          singleOption ? (
            singleOption(element)
          ) : (
            <option key={element.id} value={element.id}>
              {element.label}
            </option>
          )
        )}
      </Form.Select>
    </Form.Group>
  );
};

export default FormSelect;
