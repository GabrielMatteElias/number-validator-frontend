import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, TableContainer } from '@mui/material';
import { formatPhoneNumber } from '../../../utils/Formatters';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const FileDetailsDialog = ({ open, onClose, data }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Detalhes do Arquivo</DialogTitle>
            <DialogContent>
                <TableContainer sx={{ overflowX: 'auto', maxHeight: '65vh' }}>
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
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body1">Nenhum dado disponível.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row, index) => (
                                    <TableRow key={index} className={row.status ? 'success' : 'error'}>
                                        <TableCell>{formatPhoneNumber(row.numero)}</TableCell>
                                        <TableCell align='right'>
                                            {row.status ?
                                                <CheckCircleIcon sx={{ color: '#fff' }} titleAccess='Whatsapp válido' />
                                                :
                                                <CancelIcon sx={{ color: '#fff' }} titleAccess='Whatsapp inválido' />
                                            }
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
