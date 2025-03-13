import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_BASE_URL + '/chalecos';

const api = axios.create({
    baseURL: API_ROOT,
    headers: {
        'Content-Type': 'application/json',
        'User-Token': localStorage.getItem('user_token'),
    },
});

export const getAllChalecos = async () => {
    try {
        const { data } = await api.get('/all-chalecos');
        return { data };
    } catch (error) {
        console.error('Error fetching all chalecos:', error);
        throw error;
    }
};

export const addChaleco = async (chaleco) => {
    try {
        const { data } = await api.post('/add', chaleco);
        return { data };
    } catch (error) {
        console.error('Error adding chaleco:', error);
        throw error;
    }
};