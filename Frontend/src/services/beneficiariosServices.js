import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_BASE_URL + '/beneficiarios';

const api = axios.create({
    baseURL: API_ROOT,
    headers: {
        'Content-Type': 'application/json',
        'User-Token': localStorage.getItem('user_token'),
    },
});

export const getAllBeneficiarios = async () => {
    try {
        const { data } = await api.get('/all-beneficiarios');
        return { data };
    } catch (error) {
        console.error('Error fetching all beneficiarios:', error);
        throw error;
    }
};

export const getAllBeneficiariosOpciones = async () => {
    try {
        const { data } = await api.get('/all-beneficiarios-opciones');
        return { data };
    } catch (error) {
        console.error('Error fetching all beneficiarios como opciones:', error);
        throw error;
    }
};

export const searchBeneficiarios = async (type, value) => {
    try {
      const response = await api.get(`/search/${type}/${value}`);
      return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
          return [];
        }
        throw new Error("Error buscando beneficiario");
      }
};

export const addBeneficiario = async (beneficiario) => {
    try {
        const { data } = await api.post('/add', beneficiario);
        return { data };
    } catch (error) {
        console.error('Error adding beneficiario:', error);
        throw error;
    }
};