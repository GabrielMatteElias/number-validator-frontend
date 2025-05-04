import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Backdrop, CircularProgress } from '@mui/material';
import Upload from './components/Upload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FileDetailsDialog from './components/FileDetailsDialog';
import { formatDate } from '../../utils/Formatters';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useApi } from '../../services/useApi';

const ReportSection = () => {
    const [reports, setReports] = useState([
        { id: 1, usuario: 'João Silva', dataSolicitacao: '2025-04-01', arquivo: 'relatorio_abril.csv', totalLinhas: 120, status: 'Concluído', dataFinalizacao: '25-04-02', observacao: 'Arquivo processado com sucesso' },
        { id: 2, usuario: 'Maria Oliveira', dataSolicitacao: '2025-04-05', arquivo: 'dados_maio.txt', totalLinhas: 200, status: 'Em Processamento', dataFinalizacao: '-', observacao: 'Arquivo processado com sucesso' },
        { id: 3, usuario: 'Pedro Costa', dataSolicitacao: '2025-04-10', arquivo: 'relatorio_junho.csv', totalLinhas: 150, status: 'Concluído', dataFinalizacao: '2025-04-11', observacao: 'Arquivo processado com sucesso' },
        { id: 4, usuario: 'Ana Pereira', dataSolicitacao: '2025-04-15', arquivo: 'informacoes.csv', totalLinhas: 300, status: 'Fila', dataFinalizacao: '2025-04-16', observacao: 'Arquivo processado com sucesso' },
        { id: 5, usuario: 'Lucas Martins', dataSolicitacao: '2025-04-02', arquivo: 'relatorio_marc.csv', totalLinhas: 350, status: 'Concluído', dataFinalizacao: '2025-04-03', observacao: 'Arquivo processado com sucesso' },
        { id: 6, usuario: 'Juliana Souza', dataSolicitacao: '2025-04-03', arquivo: 'dados_maio.txt', totalLinhas: 150, status: 'Fila', dataFinalizacao: '-', observacao: 'Arquivo processado com sucesso' },
        { id: 7, usuario: 'Carlos Souza', dataSolicitacao: '2025-04-06', arquivo: 'relatorio_abril.csv', totalLinhas: 420, status: 'Em Processamento', dataFinalizacao: '-', observacao: 'Arquivo processado com sucesso' },
        { id: 8, usuario: 'Fernanda Lima', dataSolicitacao: '2025-04-07', arquivo: 'relatorio_setembro.csv', totalLinhas: 280, status: 'Concluído', dataFinalizacao: '2025-04-08', observacao: 'Arquivo processado com sucesso' },
        { id: 9, usuario: 'Rafael Oliveira', dataSolicitacao: '2025-04-10', arquivo: 'dados_agosto.csv', totalLinhas: 500, status: 'Em Processamento', dataFinalizacao: '-', observacao: 'Arquivo processado com sucesso' },
        { id: 10, usuario: 'Patrícia Alves', dataSolicitacao: '2025-04-12', arquivo: 'relatorio_novembro.csv', totalLinhas: 100, status: 'Fila', dataFinalizacao: '-', observacao: 'Arquivo processado com sucesso' },
        { id: 11, usuario: 'Marcos Pinto', dataSolicitacao: '2025-04-14', arquivo: 'dados_dezembro.csv', totalLinhas: 600, status: 'Concluído', dataFinalizacao: '2025-04-15', observacao: 'Arquivo processado com sucesso' },
        { id: 12, usuario: 'Raquel Costa', dataSolicitacao: '2025-04-16', arquivo: 'relatorio_outubro.txt', totalLinhas: 350, status: 'Fila', dataFinalizacao: '2025-04-17', observacao: 'Arquivo processado com sucesso' },
        { id: 13, usuario: 'Paulo Silva', dataSolicitacao: '2025-04-18', arquivo: 'relatorio_janeiro.csv', totalLinhas: 180, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 14, usuario: 'Letícia Rocha', dataSolicitacao: '2025-04-20', arquivo: 'relatorio_maio.csv', totalLinhas: 150, status: 'Concluído', dataFinalizacao: '2025-04-21' },
        { id: 15, usuario: 'André Martins', dataSolicitacao: '2025-04-22', arquivo: 'relatorio_julho.csv', totalLinhas: 200, status: 'Fila', dataFinalizacao: '-' },
        { id: 16, usuario: 'Cláudia Ferreira', dataSolicitacao: '2025-04-23', arquivo: 'relatorio_agosto.csv', totalLinhas: 320, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 17, usuario: 'Gabriel Almeida', dataSolicitacao: '2025-04-24', arquivo: 'dados_marco.txt', totalLinhas: 250, status: 'Concluído', dataFinalizacao: '2025-04-25' },
        { id: 18, usuario: 'Carla Dias', dataSolicitacao: '2025-04-26', arquivo: 'relatorio_setembro.csv', totalLinhas: 270, status: 'Fila', dataFinalizacao: '-' },
        { id: 19, usuario: 'Ricardo Santos', dataSolicitacao: '2025-04-27', arquivo: 'relatorio_agosto.csv', totalLinhas: 450, status: 'Concluído', dataFinalizacao: '2025-04-28' },
        { id: 20, usuario: 'Viviane Gomes', dataSolicitacao: '2025-04-29', arquivo: 'relatorio_outubro.csv', totalLinhas: 130, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 21, usuario: 'Vinícius Oliveira', dataSolicitacao: '2025-04-30', arquivo: 'dados_novembro.csv', totalLinhas: 500, status: 'Fila', dataFinalizacao: '-' },
        { id: 22, usuario: 'Gustavo Fernandes', dataSolicitacao: '2025-04-03', arquivo: 'relatorio_junho.csv', totalLinhas: 170, status: 'Concluído', dataFinalizacao: '2025-04-04' },
        { id: 23, usuario: 'Tatiane Costa', dataSolicitacao: '2025-04-06', arquivo: 'relatorio_abril.csv', totalLinhas: 450, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 24, usuario: 'Rodrigo Almeida', dataSolicitacao: '2025-04-08', arquivo: 'dados_dezembro.csv', totalLinhas: 300, status: 'Fila', dataFinalizacao: '-' },
        { id: 25, usuario: 'Cristiane Lima', dataSolicitacao: '2025-04-09', arquivo: 'relatorio_julho.csv', totalLinhas: 420, status: 'Concluído', dataFinalizacao: '2025-04-10' },
        { id: 26, usuario: 'Fábio Souza', dataSolicitacao: '2025-04-11', arquivo: 'dados_fevereiro.csv', totalLinhas: 560, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 27, usuario: 'Ana Costa', dataSolicitacao: '2025-04-12', arquivo: 'relatorio_marco.csv', totalLinhas: 360, status: 'Fila', dataFinalizacao: '-' },
        { id: 28, usuario: 'Paula Rocha', dataSolicitacao: '2025-04-14', arquivo: 'relatorio_setembro.csv', totalLinhas: 500, status: 'Concluído', dataFinalizacao: '2025-04-15' },
        { id: 29, usuario: 'Marina Oliveira', dataSolicitacao: '2025-04-16', arquivo: 'relatorio_maio.csv', totalLinhas: 250, status: 'Fila', dataFinalizacao: '-' },
        { id: 30, usuario: 'Ricardo Almeida', dataSolicitacao: '2025-04-18', arquivo: 'dados_agosto.csv', totalLinhas: 300, status: 'Concluído', dataFinalizacao: '2025-04-19' },
        { id: 31, usuario: 'Roberta Lima', dataSolicitacao: '2025-04-20', arquivo: 'relatorio_setembro.csv', totalLinhas: 200, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 32, usuario: 'Thiago Pereira', dataSolicitacao: '2025-04-22', arquivo: 'relatorio_junho.csv', totalLinhas: 380, status: 'Fila', dataFinalizacao: '-' },
        { id: 33, usuario: 'Célia Souza', dataSolicitacao: '2025-04-24', arquivo: 'relatorio_outubro.csv', totalLinhas: 420, status: 'Concluído', dataFinalizacao: '2025-04-25' },
        { id: 34, usuario: 'Sérgio Gomes', dataSolicitacao: '2025-04-26', arquivo: 'relatorio_fevereiro.csv', totalLinhas: 240, status: 'Fila', dataFinalizacao: '-' },
        { id: 35, usuario: 'Tânia Rocha', dataSolicitacao: '2025-04-27', arquivo: 'dados_dezembro.csv', totalLinhas: 320, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 36, usuario: 'Luciano Costa', dataSolicitacao: '2025-04-29', arquivo: 'relatorio_agosto.csv', totalLinhas: 230, status: 'Fila', dataFinalizacao: '-' },
        { id: 37, usuario: 'Fabiana Lima', dataSolicitacao: '2025-05-01', arquivo: 'relatorio_outubro.csv', totalLinhas: 200, status: 'Concluído', dataFinalizacao: '2025-05-02' },
        { id: 38, usuario: 'Gisele Souza', dataSolicitacao: '2025-05-03', arquivo: 'relatorio_marco.csv', totalLinhas: 330, status: 'Fila', dataFinalizacao: '-' },
        { id: 39, usuario: 'Fábio Lima', dataSolicitacao: '2025-05-05', arquivo: 'relatorio_julho.csv', totalLinhas: 270, status: 'Em Processamento', dataFinalizacao: '-' },
        { id: 40, usuario: 'Ricardo Rocha', dataSolicitacao: '2025-05-07', arquivo: 'relatorio_novembro.csv', totalLinhas: 400, status: 'Fila', dataFinalizacao: '-' }
    ]);
    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    const { getReports,getReportsDetails } = useApi();

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
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        },
        {
            numero: '4588512466',
            status: true,
        },
        {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        },
        {
            numero: '4588512466',
            status: true,
        },
        {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        },
        {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        },
        {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        },
        {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        },
        {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }, {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }, {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }, {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }, {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }, {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }, {
            numero: '1786247515',
            status: false,
        },
        {
            numero: '11985235268',
            status: true,
        },
        {
            numero: '5184878585',
            status: false,
        }
    ];

    useEffect(() => {
        async function fetchData() {
            // const response = await getReports();
            // if (response.satus_code === 200) {
            //     setReports(response.status_res)
            // }
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
        fetchData();
    }, []);

    const handleOpenDialog = async(data) => {
        setSelectedData([])
        setOpenDialog(true);
        // const response = await getReportsDetails(data);
            // if (response.satus_code === 200) {
            //     setReports(response.status_res)
            // }
            setTimeout(() => {
                setSelectedData(reportsDialog)
            }, 3000)
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };    

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <Upload />
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem' }}>
                Relatório de Arquivos Enviados
            </Typography>
            <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: '70vh' }}>
                <Table sx={{ minWidth: 650 }} aria-label="relatório de arquivos enviados">
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
                                                <OpenInNewIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenDialog(reportsDialog)} title='Baixar arquivo'>
                                                <FileDownloadIcon />
                                            </IconButton>
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
    );
};

export default ReportSection;
