import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErro('');

        if (!email || !senha) {
            setErro('Preencha todos os campos.');
            return;
        }

        setLoading(true);

        // Simula uma requisição
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/')
        }, 1500);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.formContainer}>
                <Typography variant="h4" color='success' className={styles.title}>
                    Valida<Typography variant='span' color='primary'>Whats</Typography>
                </Typography>
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
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
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
