import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useApi } from '../../../services/useApi';
import { useState } from 'react';
import SEO from '../../../components/SEO';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const { registerUser, loading } = useApi();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        if (formData.password !== formData.confirmPassword) {
            setErro('As senhas não coincidem!');
            return;
        }

        if (!formData.name || !formData.cpf || !formData.email || !formData.password) {
            setErro('Preencha todos os campos obrigatórios');
            return;
        }

        const response = await registerUser(formData.cpf, formData.name, formData.email, formData.password);

        if (response.status_code === 200) {
            navigate('/login', { state: { registrationSuccess: true } });
        } else {
            setErro(response.status_message || 'Erro ao cadastrar usuário');
        }
    };

    return (
        <>
            <SEO
                title="ValidaWhats - Cadastrar-se"
                description="Cadastre-se gratuitamente e comece a validar números de WhatsApp agora mesmo."
                url='https://validaWhats.com/cadastro'
            />
            <Box className={styles.container}>
                <Paper className={styles.paper}>
                    <Typography variant="h4" className={styles.title} gutterBottom>
                        Cadastre-se
                    </Typography>

                    <Box component='form' onSubmit={handleSubmit} className={styles.form} noValidate>
                        <TextField
                            name="name"
                            label="Nome Completo"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <TextField
                            name="cpf"
                            label="CPF"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.cpf}
                            onChange={handleChange}
                        />

                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            name="password"
                            label="Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <TextField
                            name="confirmPassword"
                            label="Confirmar Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={formData.confirmPassword && formData.password !== formData.confirmPassword}
                            helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'As senhas não coincidem!' : ''}
                        />

                        {erro && (
                            <Alert severity="error">
                                {erro}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Registrar'}
                        </Button>

                        <Typography variant="body2" textAlign="center">
                            Já tem uma conta?{' '}
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Typography component="span" color="primary">
                                    Entrar
                                </Typography>
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </>

    );
};

export default Register;