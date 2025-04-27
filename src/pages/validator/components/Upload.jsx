import { useState } from 'react';
import { Button, Input, Box, Snackbar, Alert } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'; 
import styles from './Upload.module.css'
import { truncateFileName } from '../../../utils/Formatters';

const Upload = () => {
    const theme = useTheme(); // Usando o hook para acessar o tema
    const [selectedFile, setSelectedFile] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success, error, warning, info

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

        // Simula envio de arquivo e resposta
        setSnackbarMessage('Arquivo enviado com sucesso!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // Limpa o campo após o envio
        setSelectedFile('');
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box  className={styles['container']}>
            {/* Input de arquivo */}
            <Input id="file-upload" type="file" onChange={handleFileChange} inputProps={{ accept: '.csv, .txt', }} sx={{ display: 'none' }} />

            <label htmlFor="file-upload">
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    className={styles['fixed-button']}                                         
                >
                    {selectedFile ? truncateFileName(selectedFile.name) : 'Escolher Arquivo'}
                </Button>
            </label>

            {/* Botão de Enviar */}
            <Button
                variant="contained"
                color="success"
                onClick={handleUpload}                
            >
                Enviar
            </Button>

            {/* Snackbar de feedback */}
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                autoHideDuration={theme.snackbar.autoHideDuration}
                anchorOrigin={theme.snackbar.anchorOrigin} // Usando o anchorOrigin do tema
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Upload;
