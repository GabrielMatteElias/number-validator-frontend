import { Box, Typography, Card, CardContent, LinearProgress, Button, Tooltip, Chip } from '@mui/material';
import styles from './Profile.module.css';

const Profile = () => {

    const usuario = {
        nome: 'João da Silva',
        email: 'joao@email.com',
        planoAtual: { quantidade: 1000, usados: 500 }
    };

    const pacotes = [
        { id: 1, quantidade: 1000, preco: 30 },
        { id: 2, quantidade: 2500, preco: 50, recomendado: true },
        { id: 3, quantidade: 5000, preco: 90 },
        { id: 4, quantidade: 10000, preco: 150 },
    ];

    const progresso = (usuario.planoAtual.usados / usuario.planoAtual.quantidade) * 100;

    return (
        <Box className={styles.container}>
            <Card className={styles.card}>
                <CardContent>
                    {/* User info section */}
                    <Box className={styles.userInfo}>
                        <Typography variant="h6" className={styles.userName}>{usuario.nome}</Typography>
                        <Typography variant="body2" className={styles.userEmail}>{usuario.email}</Typography>
                    </Box>

                    {/* Numbers available section */}
                    <Typography variant="subtitle1" className={styles.sectionTitle}>
                        Números disponíveis
                    </Typography>

                    <Box className={styles.numbersContainer}>
                        <Box>
                            <Typography variant="h5" className={styles.numbersAvailable}>
                                {`${usuario.planoAtual.quantidade - usuario.planoAtual.usados} `}
                            </Typography>
                            <Typography variant="body1" className={styles.numbersTotal}>
                                de {usuario.planoAtual.quantidade}
                            </Typography>
                        </Box>
                        <Chip
                            label={`${Math.round(progresso)}% utilizado`}
                            size="medium"
                            className={styles.usageChip}
                            color={progresso > 75 ? 'warning' : 'primary'}
                        />
                    </Box>

                    {/* Progress bar */}
                    <Tooltip title={`${usuario.planoAtual.usados} números utilizados`} arrow>
                        <LinearProgress
                            variant="determinate"
                            value={progresso}
                            className={styles.progressBar}
                            color={progresso > 80 ? 'warning' : 'primary'}
                        />
                    </Tooltip>
                </CardContent>
            </Card>

            {/* Pacotes Disponíveis */}
            <Box className={styles.pacotesContainer}>
                {pacotes.map(pacote => (
                    <Card
                        key={pacote.id}
                        className={`${styles.pacoteCard} ${pacote.recomendado ? styles.recomendado : ''}`}
                    >
                        <CardContent sx={{ textAlign: 'center' }}>
                            {pacote.recomendado && (
                                <Typography variant="caption" color="primary" className={styles.recomendadoBadge}>
                                    RECOMENDADO
                                </Typography>
                            )}
                            <Typography variant="h6">
                                {pacote.quantidade.toLocaleString()} números
                            </Typography>
                            <Typography variant="body1" mb={2}>
                                R${pacote.preco}
                            </Typography>
                            <Button variant="contained" size="small" fullWidth>
                                Comprar
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Profile;
