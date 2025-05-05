import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Graphics = ({ chartData, chartType, largura, altura }) => {
    const chartOptions = {
        plugins: {
            legend: {
                position: 'top', // Posiciona a legenda no topo                
            },
            tooltip: {
                enabled: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const renderChart = () => {
        switch (chartType) {
            case 1:
                return <Pie data={chartData} options={chartOptions} />;
            case 2:
                return <Bar data={chartData} options={chartOptions} />;
            default:
                return <p>Tipo de gráfico inválido</p>;
        }
    };

    return (
        <div style={{ width: largura ? largura : '400px', height: altura ? altura : '400px' }}>
            {renderChart()}
        </div>
    );
};

export default Graphics;