import Box from '@mui/material/Box';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.logoWrapper}>
                <img
                    src='/assets/validate.webp'
                    alt="ValidaWhats Logo"
                    className={styles.logo}
                />
            </Box>

            <Box className={styles.progressBarContainer}>
                <Box className={styles.progressBackground}></Box>
                <Box className={styles.progressBar}></Box>
            </Box>
        </Box>
    );
}

export default Loading;