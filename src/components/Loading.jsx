import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import styles from './Loading.module.css';

// components/Loading.jsx
const Loading = () => {
    return (
        <Box className={styles.container}>
            <CircularProgress color="primary" size={48} />
            <Typography variant="body1" color="textSecondary">
                Carregando...
            </Typography>
        </Box>
    );
}

export default Loading;
