import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { formatPhoneNumber } from '../../../utils/Formatters';
import { useState } from 'react';

const FileDetailsDialog = ({ open, onClose, data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item =>
        item.numero.toString().includes(searchTerm)
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Detalhes do Arquivo</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Pesquisar número..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
                            </InputAdornment>
                        ),
                    }}
                />
                <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: '65vh', boxShadow: 'none' }}>
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Número</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center', py: 4 }}>
                                        <CircularProgress color="primary" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td': { borderBottom: 0 },
                                            bgcolor: row.status ? 'rgba(76, 175, 80, 0.08)' : 'rgba(244, 67, 54, 0.08)'
                                        }}
                                    >
                                        <TableCell>{formatPhoneNumber(row.numero)}</TableCell>
                                        <TableCell align="right">
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: '50%',
                                                    bgcolor: row.status ? '#4CAF50' : '#F44336'
                                                }}
                                            >
                                                {row.status ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 6L6 18M6 6l12 12" />
                                                    </svg>
                                                )}
                                            </Box>
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
