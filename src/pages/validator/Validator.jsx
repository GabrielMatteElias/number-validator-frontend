import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Upload from './components/Upload';
import FileDetailsDialog from './components/FileDetailsDialog';
import { formatDateTime, toCamelCase } from '../../utils/Formatters';
import { useApi } from '../../services/useApi';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';
import MobileBottomSheet from './components/FileDetailsDialogMobile';
import { useNavigate } from 'react-router-dom';
import { downloadBase64File } from '../../utils/DownloadFile';
import { generateFileName } from '../../utils/GenerateFileName';
import ReportCardList from './components/ReportCardList';

const ReportSection = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [reportDetails, setReportDetails] = useState([]);

    const { getReports, getReportsDetails, exportFileReportDetails } = useApi();

    const { user } = useAuth();

    const isMobile = useMediaQuery('(max-width:600px)');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await getReports();

            if (response.status_code === 200) {
                const camelData = toCamelCase(response.status_res);

                setReports(camelData)
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    const handleOpenDialog = async (id) => {
        setReportDetails([]);
        setOpenDialog(true);
        const response = await getReportsDetails(5);
        if (response.status_code === 200) {
            setReportDetails(response.status_res);
            return;
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleExport = async (id) => {
        const response = await exportFileReportDetails(5);

        if (response.status_code === 200) {
            const fileName = generateFileName('whatsapp-validacao', 'zip')

            downloadBase64File(response.status_res, fileName);
            return;
        }
    };

    if (!user) return null;

    return (
        <>
            <SEO title="ValidaWhats - Valide seus Números" description="Faça upload dos seus contatos e valide quais são WhatsApp e quais não são." url='https://validaWhats.com' />
            <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0' : '2rem' }}>
                <Upload />
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem' }}>
                    Relatório de Arquivos Enviados
                </Typography>
                {!isMobile ? (
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: '70vh' }}>
                        <Table sx={{ minWidth: 650, '@media (maxWidth: 600px)': { minWidth: 'unset', width: 'max-content' } }} aria-label="relatório de arquivos enviados">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Arquivo</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align='center'>Data Solicitação</TableCell>
                                    <TableCell>Total Linhas</TableCell>
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
                                                <TableCell>{report.arquivo}</TableCell>
                                                <TableCell>{report.status}</TableCell>
                                                <TableCell align='center'>{formatDateTime(report.momento)}</TableCell>
                                                <TableCell align='right'>{report.totalLinhas}</TableCell>
                                                <TableCell align='center'>{formatDateTime(report.dataFinalizacao)}</TableCell>
                                                <TableCell align='left'>{report.observacao}</TableCell>
                                                <TableCell align='center' sx={{ minWidth: '10rem' }}>
                                                    <IconButton onClick={() => handleOpenDialog(report.id)} title='Ver mais'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-externalLink-icon lucide-externalLink"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                                    </IconButton>
                                                    <IconButton onClick={() => handleExport(report.id)} title='Baixar arquivo'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down-icon lucide-file-down"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <ReportCardList reports={reports} handleOpenDialog={handleOpenDialog} handleExport={handleExport} />
                )}
                {isMobile ? (
                    <MobileBottomSheet open={openDialog} onClose={handleCloseDialog} data={reportDetails} />
                ) : (
                    <FileDetailsDialog open={openDialog} onClose={handleCloseDialog} data={reportDetails} />
                )}
            </Box>
        </>
    );
};

export default ReportSection;
