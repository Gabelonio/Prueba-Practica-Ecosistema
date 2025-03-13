import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_BASE_URL + '/authentication';

const api = axios.create({
    baseURL: API_ROOT,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const login = async (nombreUsuario, contraseña) => {
    try {
        const { data } = await api.post('/login', { "nombre_usuario" : nombreUsuario, contraseña });
        //Coloca los Tokens en el Local Storage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_token', data.user_token);
        return data;
    } catch (error) {
        console.error('Error en el login:', error);

        if (error.response && error.response.status === 401) {
            throw new Error('Credenciales incorrectas');
        }

        throw error;
    }
};

export const logout = async () => {
    try {
        await api.post('/logout');
    } catch (error) {
        console.error('Error en el logout:', error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_token');
    }
};