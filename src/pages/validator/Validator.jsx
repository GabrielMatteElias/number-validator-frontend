import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Backdrop, CircularProgress } from '@mui/material';
import Upload from './components/Upload';
import FileDetailsDialog from './components/FileDetailsDialog';
import { formatDate } from '../../utils/Formatters';
import { useApi } from '../../services/useApi';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';

const ReportSection = () => {
    const [reports, setReports] = useState([
        { id: 1, usuario: 'João Silva', dataSolicitacao: '2025-04-01', arquivo: 'relatorio_abril.csv', totalLinhas: 120, status: 'Concluído', dataFinalizacao: '25-04-02', observacao: 'Arquivo processado com sucesso' },
        { id: 2, usuario: 'Maria Oliveira', dataSolicitacao: '2025-04-05', arquivo: 'dados_maio.txt', totalLinhas: 200, status: 'Em Processamento', dataFinalizacao: '-', observacao: 'Arquivo processado com sucesso' },
        { id: 3, usuario: 'Pedro Costa', dataSolicitacao: '2025-04-10', arquivo: 'relatorio_junho.csv', totalLinhas: 150, status: 'Concluído', dataFinalizacao: '2025-04-11', observacao: 'Arquivo processado com sucesso' },
        { id: 40, usuario: 'Ricardo Rocha', dataSolicitacao: '2025-05-07', arquivo: 'relatorio_novembro.csv', totalLinhas: 400, status: 'Fila', dataFinalizacao: '-' }
    ]);
    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    const { getReports, getReportsDetails } = useApi();

    const { user } = useAuth();
    console.log(user);

    // Dados chumbados para a tabela
    const reportsDialog = [
        {
            numero: '4588512466',
            status: true,
        },
        {
            numero: '1786247515',
            status: false,
        },

    ];

    useEffect(() => {
        async function fetchData() {
            // const response = await getReports();
            // if (response.satus_code === 200) {
            //     setReports(response.status_res)
            // }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleOpenDialog = async (data) => {
        setSelectedData([])
        setOpenDialog(true);
        // const response = await getReportsDetails(data);
        // if (response.satus_code === 200) {
        //     setReports(response.status_res)
        // }
        setSelectedData(reportsDialog)
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <SEO
                title="ValidaWhats - Valide seus Números"
                description="Faça upload dos seus contatos e valide quais são WhatsApp e quais não são."
                url='https://validaWhats.com'
            />
            <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <Upload />
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem' }}>
                    Relatório de Arquivos Enviados
                </Typography>
                <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: '70vh' }}>
                    <Table sx={{
                        minWidth: 650,
                        '@media (maxWidth: 600px)': {
                            minWidth: 'unset',
                            width: 'max-content'
                        }
                    }}
                        aria-label="relatório de arquivos enviados">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Data Solicitação</TableCell>
                                <TableCell>Arquivo</TableCell>
                                <TableCell>Total Linhas</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align='center'>Data Finalização</TableCell>
                                <TableCell>Observação</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
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
                                </TableRow>) : (
                                reports.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ textAlign: 'center', padding: '1.5rem' }}>
                                            Nenhum arquivo enviado ainda.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    reports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell align='center'>{formatDate(report.dataSolicitacao)}</TableCell>
                                            <TableCell>{report.arquivo}</TableCell>
                                            <TableCell align='right'>{report.totalLinhas}</TableCell>
                                            <TableCell>{report.status}</TableCell>
                                            <TableCell align='center'>{formatDate(report.dataFinalizacao)}</TableCell>
                                            <TableCell align='left'>{report.observacao}</TableCell>
                                            <TableCell align='center' sx={{ minWidth: '10rem' }}>
                                                <IconButton onClick={() => handleOpenDialog(report.id)} title='Ver mais'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-externalLink-icon lucide-externalLink"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>                                                </IconButton>
                                                <IconButton onClick={() => handleOpenDialog(reportsDialog)} title='Baixar arquivo'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down-icon lucide-file-down"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <FileDetailsDialog open={openDialog} onClose={handleCloseDialog} data={selectedData} />
            </Box>
        </>
    );
};

export default ReportSection;
