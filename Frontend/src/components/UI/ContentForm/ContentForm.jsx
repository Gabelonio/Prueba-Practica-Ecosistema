import { Form, Button, Alert } from "react-bootstrap";
const ContentForm = ({
  handleSubmit,
  error,
  loading,
  children
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {children}
      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </Form>
  );
};

export default ContentForm;
