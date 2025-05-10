import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

import styles from './Login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { login, loading, error, user } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            navigate('/');
        }
    }, [user, loading]);


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

        if (!email || !password) {
            setErro('Preencha todos os campos.');
            return;
        }

        await login(email, password);
    };

    if (user) return null;

    return (
        <>
            <SEO
                title="ValidaWhats - Entrar"
                description="Acesse sua conta para validar números de WhatsApp com eficiência."
                url='https://validaWhats.com/login'
            />
            <Box className={styles.container}>
                <Box className={styles.formContainer}>
                    <Typography variant="h4" className={styles.title} gutterBottom>
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

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
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
                        Não tem conta? <Link to='/cadastro'><Typography color="primary" variant='p'>Cadastre-se</Typography></Link>
                    </Typography>
                </Box>
            </Box>
        </>

    );
};

export default Login;