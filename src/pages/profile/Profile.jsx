import { Avatar, Box, Typography, Card, CardContent, LinearProgress, Button, Tooltip } from '@mui/material';
import styles from './Profile.module.css';
import PersonIcon from '@mui/icons-material/Person';
import profilePicture from '../../assets/profile-picture.png'

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
            {/* Plano Atual */}
            <Card className={styles.cardPlano}>
                <CardContent>
                    <Box display='flex' alignItems='center' gap={1}>
                        <Typography variant="h6">{usuario.nome}</Typography>
                        <Typography variant="body2" color="text.secondary">{usuario.email}</Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom>Seu Plano Atual</Typography>
                    <Typography variant="body1">
                        {`${usuario.planoAtual.quantidade} números`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        {`${usuario.planoAtual.usados} utilizados`}
                    </Typography>
                    <Tooltip title={`${usuario.planoAtual.usados}`} arrow >
                        <LinearProgress variant="determinate" value={progresso} />
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
