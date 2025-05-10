import {
    SwipeableDrawer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Box,
    CircularProgress,
    Paper,
    InputAdornment,
    styled,
    Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { formatPhoneNumber } from '../../../utils/Formatters';
import { useState } from 'react';

// Componente estilizado para o Paper do Drawer
const StyledDrawerPaper = styled(Paper)(({ theme }) => ({
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    padding: theme.spacing(2),
}));

const MobileBottomSheet = ({ open, onClose, data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item =>
        item.numero.toString().includes(searchTerm)
    );

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={() => { }}
            disableSwipeToOpen={true}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    maxHeight: '90vh',
                }
            }}
        >
            <Box sx={{ p: 2 }}>
                {/* Indicador de arraste */}
                <Box sx={{
                    width: 40,
                    height: 4,
                    backgroundColor: "#ddd",
                    borderRadius: 2,
                    margin: "0 auto 16px"
                }} />

                {/* Campo de pesquisa */}
                <Typography mb={.5}>Detalhes do arquivo</Typography>
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

                {/* Tabela de resultados */}
                <TableContainer
                    component={StyledDrawerPaper}
                    sx={{
                        overflowX: 'auto',
                        maxHeight: '55vh',
                        boxShadow: 'none',
                        borderRadius: '8px',
                        paddingTop: 0
                    }}
                >
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
            </Box>
        </SwipeableDrawer>
    );
}

export default MobileBottomSheet;