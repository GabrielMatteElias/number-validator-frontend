import { useState } from 'react';
import { Button, Input, Box, Snackbar, Alert } from '@mui/material';
import { CloudUpload as CloudUploadIcon, PlayCircleOutline as PlayCircleOutlineIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import styles from './Upload.module.css';
import { truncateFileName } from '../../../utils/Formatters';
import { useAuth } from '../../../context/AuthContext';
import { useApi } from '../../../services/useApi';

const Upload = () => {
    const theme = useTheme();
    const [selectedFile, setSelectedFile] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { createQueue, triggerQueue } = useApi();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setSnackbarMessage('Por favor, selecione um arquivo primeiro.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        const response = createQueue(selectedFile)

        setSnackbarMessage('Arquivo enviado com sucesso!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setSelectedFile('');
    };

    const handleTriggerQueue = () => {

        const response = triggerQueue(selectedFile)

        setSnackbarMessage('Fila disparada com sucesso!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box className={styles.container}>
            <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: '.csv, .txt' }}
                className={styles.fileInput}
            />

            <div className={styles.buttonGroup}>
                <label htmlFor="file-upload" className={styles.fileLabel}>
                    <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        className={styles.uploadButton}
                    >
                        {selectedFile ? truncateFileName(selectedFile.name) : 'Escolher Arquivo'}
                    </Button>
                </label>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpload}
                    className={styles.actionButton}
                >
                    Enviar
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleTriggerQueue}
                    startIcon={<PlayCircleOutlineIcon />}
                    className={styles.actionButton}
                >
                    Disparar Fila
                </Button>
            </div>

            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                autoHideDuration={theme.snackbar.autoHideDuration}
                anchorOrigin={theme.snackbar.anchorOrigin}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    className={styles.alert}
                    variant="filled"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Upload;