import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, TableContainer, Box, CircularProgress, Paper } from '@mui/material';
import { formatPhoneNumber } from '../../../utils/Formatters';

const FileDetailsDialog = ({ open, onClose, data }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Detalhes do Arquivo</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: '65vh', boxShadow: 'none' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell align='right'>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} sx={{
                                        textAlign: 'center',
                                        padding: '2rem',
                                        position: 'relative',
                                        height: '100px' // Altura fixa para evitar flickering da scrollbar
                                    }}>
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}>
                                            <CircularProgress color="primary" size={60} sx={{ transition: 'all 0.3s ease', }} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (data.map((row, index) => (
                                <TableRow key={index} className={row.status ? 'success' : 'error'}>
                                    <TableCell>{formatPhoneNumber(row.numero)}</TableCell>
                                    <TableCell align='right'>
                                        {row.status ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>}
                                    </TableCell>
                                </TableRow>
                            ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileDetailsDialog;
