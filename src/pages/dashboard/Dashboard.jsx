import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import Graphics from './components/Graphics';

const Dashboard = () => {
    const totalNumeros = 23800;
    const numerosValidos = 15200;
    const numerosInvalidos = 8600;

    const pieData = {
        labels: ['Whatsapp válidos', 'Whatsapp inválidos'],
        datasets: [
            {
                data: [numerosValidos, numerosInvalidos],
                backgroundColor: ['#10B981', '#EF4444'],
                hoverBackgroundColor: ['#059669', '#DC2626'],
            },
        ],
    };

    const barData = {
        labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
        datasets: [
            {
                label: 'WhatsApps Válidos',
                backgroundColor: '#10B981',
                hoverBackgroundColor: '#059669',
                data: [2000, 3000, 2600, 4800, 950, 1850],
            },
            {
                label: 'WhatsApps Inválidos',
                backgroundColor: '#EF4444',
                hoverBackgroundColor: '#DC2626',
                data: [500, 800, 1100, 2000, 2500, 1700],
            },
        ],
    };

    return (
        <Box p={4}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                Dashboard de Validações
            </Typography>

            <Card>
                <CardContent>
                    <Grid container spacing={25}>
                        {/* Lado Esquerdo: Cards Empilhados */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" color="textSecondary">
                                                Total de Números
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold">
                                                {totalNumeros.toLocaleString('pt-BR')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" color="textSecondary">
                                                Números Válidos
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold" color="success.main">
                                                {numerosValidos.toLocaleString('pt-BR')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" color="textSecondary">
                                                Números Inválidos
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold" color="error.main">
                                                {numerosInvalidos.toLocaleString('pt-BR')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Graphics altura={'250px'} chartData={pieData} chartType={1} />
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Graphics chartData={barData} chartType={2} largura="100%" altura="250px" />
                </CardContent>
            </Card>

        </Box>
    );
};

export default Dashboard;
