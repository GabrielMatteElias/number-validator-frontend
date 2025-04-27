import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você vai tratar o cadastro (ex: enviar para uma API)
    };

    return (
        <Box className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
                <Typography variant="h4" className={styles.title}>
                    Cadastre-se
                </Typography>
                <Box component='form' onSubmit={handleSubmit} className={styles.form} noValidate>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        required
                        className={styles.input}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        className={styles.input}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        className={styles.input}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        className={styles.button}
                    >
                        Registrar
                    </Button>
                    <Typography variant="body2" className={styles.link}>
                        Já tem uma conta? <Link to="/login">Entrar</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
