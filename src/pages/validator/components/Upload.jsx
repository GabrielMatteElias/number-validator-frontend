import { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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

    const { createQueue, triggerQueue, error } = useApi();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
console.log(error);

    const handleUpload = async () => {
        if (!selectedFile) {
            setSnackbarMessage('Por favor, selecione um arquivo primeiro.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }
            setSnackbarSeverity(error);

        const response = await createQueue(selectedFile)
        console.log('response');

        setOpenSnackbar(true);
        setSnackbarMessage(response.status_msg);

        if (response.status_code === 200) {
            setSnackbarSeverity('success');
        } else {

        }

        setSelectedFile('');
    };

    const handleTriggerQueue = async () => {
        const response = await triggerQueue()
        setOpenSnackbar(true);
        setSnackbarMessage(response.status_msg);

        if (response.status_code === 200) {
            setSnackbarSeverity('success');
            return;
        } else {
            setSnackbarSeverity('error');
        }
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
                        startIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload-icon lucide-cloud-upload"><path d="M12 13v8" /><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="m8 17 4-4 4 4" /></svg>}
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
                    startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-play-icon lucide-circle-play"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>}
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