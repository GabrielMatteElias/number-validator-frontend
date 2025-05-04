// src/contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTokenValidityService, loginService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Verifica se há usuário logado ao carregar o app
    useEffect(() => {
        async function loadUserFromStorage() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await checkTokenValidityService(token);
                    console.log(response);

                    setUser(prev => ({ ...prev, ...response.data.user }));
                } catch (err) {
                    console.log(err);

                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        }
        loadUserFromStorage();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null)
        try {
            const response = await loginService(email, password);

            setUser(prev => ({ ...prev, ...response.data }));

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.codigo_usuario));
            navigate('/')
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
        localStorage.removeItem('user');
        navigate('/login')
    };

    const updateUser = (updatedData) => { // Atualiza os dados do usuário. Ex: atualizar quantidade de numeros disponiveis para validacao
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar o contexto
export function useAuth() {
    return useContext(AuthContext);
}