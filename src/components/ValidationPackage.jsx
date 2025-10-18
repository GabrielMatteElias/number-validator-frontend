import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import styles from './ValidationPackage.module.css';
import { useMemo } from 'react';

export default function ValidationPackage() {
    const pacotesData = [
        { id: 1, quantidade: 1000, preco: 30 },
        { id: 3, quantidade: 5000, preco: 90 },
        { id: 4, quantidade: 10000, preco: 150 },
        { id: 5, quantidade: 20000, preco: 260 },
        { id: 6, quantidade: 50000, preco: 500 },
    ];

    const calculatePackageDetails = (packages) => {
        if (!Array.isArray(packages) || packages.length === 0) return [];

        const BASE_QUANTITY = 1000;
        const DEFAULT_BASE_PRICE = 30;

        const basePackage = packages.find(p => p.quantidade === BASE_QUANTITY);
        const basePrice = basePackage?.preco ?? DEFAULT_BASE_PRICE;
        const baseUnitValue = basePrice / BASE_QUANTITY;

        const formatCurrency = (value) =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
            })
                .format(value)
                .replace('R$', '')
                .trim();

        const calculateEconomy = (unitValue) => {
            const percentage = (1 - unitValue / baseUnitValue) * 100;
            return percentage > 0 ? `${percentage.toFixed(0)}%` : null;
        };

        return packages.map((pack) => {
            const unitValue = pack.preco / pack.quantidade;

            return {
                ...pack,
                unitarioFormatado: formatCurrency(unitValue),
                economia: pack.quantidade > BASE_QUANTITY ? calculateEconomy(unitValue) : null,
                isBestValue: pack.quantidade === 50000,
            };
        });
    };

    const packageDetails = useMemo(() => calculatePackageDetails(pacotesData), []);
    return (
        <Box className={styles.pacotesContainer}>
            {packageDetails.map((p) => (
                <Card
                    key={p.id}
                    className={`${styles.pacoteCard} 
            ${p.isBestValue ? styles.melhorValor : ''}`}
                >
                    <CardContent className={styles.cardContent}>
                        <Box sx={{ minHeight: '2.2rem' }}>
                            {p.isBestValue && (
                                <Chip
                                    label="MELHOR VALOR"
                                    size="small"
                                    color="success"
                                    sx={{ mb: 1, fontSize: '1rem', color: 'white' }}
                                />
                            )}
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {p.quantidade.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                            validações
                        </Typography>

                        <Typography variant="h4" color="text.primary" sx={{ my: 1 }}>
                            R${p.preco}
                        </Typography>

                        <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                                Valor Unitário: {p.unitarioFormatado}
                            </Typography>
                            {p.economia && (
                                <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
                                    Economize {p.economia}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ mt: 'auto' }}>
                            <Button variant="contained" size="medium" fullWidth>
                                Comprar
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
