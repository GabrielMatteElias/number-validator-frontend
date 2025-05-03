// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'https://validawhats.onrender.com/v1';

export function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    // Função base para todas as requisições
    const makeRequest = useCallback(
        async (config) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios({
                    method: config.method,
                    url: `${API_BASE_URL}${config.url}`,
                    data: config.data,
                    params: config.params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                return response.data;
            } catch (err) {
                // Tratamento de erro 401 (não autorizado)
                if (err.response?.status === 401) {
                    logout();
                    setError('Sessão expirada. Por favor, faça login novamente.');
                } else {
                    setError(
                        err.response?.data?.message ||
                        err.message ||
                        'Ocorreu um erro inesperado'
                    );
                }

                throw err;
            } finally {
                setLoading(false);
            }
        },
        [logout]
    );

    // Auth Endpoints
    const login = useCallback(
        (email, password) =>
            makeRequest({
                method: 'post',
                url: '/login',
                data: { email, password },
            }),
        [makeRequest]
    );

    const checkTokenValidity = useCallback(
        () =>
            makeRequest({
                method: 'post',
                url: '/tempo-restante-token',
            }),
        [makeRequest]
    );

    const registerUser = useCallback(
        (cpf, name, email, password) =>
            makeRequest({
                method: 'put',
                url: '/usuario/criar',
                data: { cpf, name, email, password },
            }),
        [makeRequest]
    );

    // User Endpoints
    const getUserData = useCallback(
        (userId) =>
            makeRequest({
                method: 'post',
                url: '/usuario/buscar',
                data: { userId },
            }),
        [makeRequest]
    );

    const getUserDashboard = useCallback(
        () =>
            makeRequest({
                method: 'post',
                url: '/usuario/dashboard',
            }),
        [makeRequest]
    );

    // Queue Endpoints
    const getReports = useCallback(
        (userId) =>
            makeRequest({
                method: 'post',
                url: '/fila/carregar',
                data: { reportId },
            }),
        [makeRequest]
    );

    const getReportsDetails = useCallback(
        (reportId) =>
            makeRequest({
                method: 'post',
                url: '/fila/carregar-dados',
                data: { reportId },
            }),
        [makeRequest]
    );

    const createQueue = useCallback(
        (file) => {
            const formData = new FormData();
            formData.append('file', file);

            return makeRequest({
                method: 'put',
                url: '/fila/criar',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        [makeRequest]
    );

    const triggerQueue = useCallback(
        (userId) =>
            makeRequest({
                method: 'post',
                url: '/fila/disparar',
                data: { userId },
            }),
        [makeRequest]
    );

    return {
        loading,
        error,
        clearError: () => setError(null),

        // Auth methods
        login,
        checkTokenValidity,

        // User methods
        getUserData,
        registerUser,
        getUserDashboard,

        // Queue methods
        getReports,
        getReportsDetails,
        createQueue,
        triggerQueue,
    };
}