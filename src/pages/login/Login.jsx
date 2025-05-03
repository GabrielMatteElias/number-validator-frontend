import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styles from './Login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const { login, loading, error } = useApi();

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (location.state?.registrationSuccess) {
            setShowSuccess(true);

            // Remove a mensagem após 5 segundos
            const timer = setTimeout(() => {
                setShowSuccess(false);
                navigate('.', { replace: true, state: {} });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [location.state, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        if (!email || !password) {
            setErro('Preencha todos os campos.');
            return;
        }

        const response = await login(email, password);
        console.log(response);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.formContainer}>
                <Typography variant="h4" color='success' className={styles.title} gutterBottom>
                    Valida<Typography variant='span' color='primary'>Whats</Typography>
                </Typography>

                {showSuccess && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Cadastro realizado com sucesso!
                    </Alert>
                )}
                <Box component='form' className={styles.form} onSubmit={handleLogin} noValidate>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {erro && (
                        <Typography color="error" variant="body2">
                            {erro}
                        </Typography>
                    )}

                    <Button
                        className={styles.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Box>

                <Typography className={styles.footerText}>
                    Não tem conta? <Link to='/register'><Typography color="primary" variant='p'>Cadastre-se</Typography></Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
