import { useState } from 'react';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { formatDateTime } from '../../../utils/Formatters';

const pageSize = 5;

export default function ReportCardList({ reports, handleOpenDialog, handleExport }) {
    const [visibleCount, setVisibleCount] = useState(pageSize);

    const visibleReports = reports.slice(0, visibleCount);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {visibleReports.map((report) => (
                <Card key={report.id} variant="outlined">
                    <CardContent>
                        <Box mt={1} display="flex" justifyContent={'space-between'} gap={1}>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    {report.arquivo}
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpenDialog(report.id)} title="Ver mais">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-externalLink-icon lucide-externalLink"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                </IconButton>
                                <IconButton onClick={() => handleExport(report.id)} title="Baixar arquivo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down-icon lucide-file-down"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="body2">Status: {report.status}</Typography>
                        <Typography variant="body2">
                            Data Solicitação: {formatDateTime(report.momento)}
                        </Typography>
                        <Typography variant="body2">Total Linhas: {report.totalLinhas}</Typography>
                        <Typography variant="body2">
                            Data Finalização: {formatDateTime(report.dataFinalizacao)}
                        </Typography>
                        <Typography variant="body2">Observação: {report.observacao}</Typography>

                    </CardContent>
                </Card>
            ))}

            {visibleCount < reports.length && (
                <Button
                    variant="outlined"
                    onClick={() => setVisibleCount((prev) => prev + pageSize)}
                >
                    Ver mais
                </Button>
            )}
        </Box>
    );
}
