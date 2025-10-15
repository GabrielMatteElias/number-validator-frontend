// src/contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTokenValidityService, loginService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Verifica se há usuário logado ao carregar o app
    useEffect(() => {
        async function loadUserFromStorage() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await checkTokenValidityService(token);

                    if (response.status === 200) {
                        setUser({ id: response.data.id_usuario });
                    }

                } catch (err) {
                    setError(
                        err.response?.data?.detail ||
                        err.message ||
                        'Ocorreu um erro inesperado'
                    );
                    // localStorage.removeItem('token');
                }
            }
            setLoading(false);
        }

        loadUserFromStorage();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError('')

        try {
            const response = await loginService(email, password);

            setUser(prev => ({ ...prev, ...response.data }));

            const token = response.data.token.replace(/^['"]|['"]$/g, '');

            localStorage.setItem('token', token);
            navigate('/validador')
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.message ||
                'Ocorreu um erro inesperado'
            );
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/')
    };

    const updateUser = (updatedData) => { // Atualiza os dados do usuário como a quantidade de numeros disponiveis para validacao
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}