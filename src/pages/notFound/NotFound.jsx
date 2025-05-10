import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                <Typography variant="h1" className={styles.errorCode}>
                    404
                </Typography>
                <Typography variant="h5" className={styles.title}>
                    Página Não Encontrada
                </Typography>
                <Typography variant="body1" className={styles.description}>
                    A página que você está procurando não existe ou foi movida.
                </Typography>
                <Button
                    variant="contained"
                    className={styles.button}
                    onClick={() => navigate('/')}
                >
                    Voltar para a Página Inicial
                </Button>
            </Box>
        </Box>
    );
};

export default NotFound;
