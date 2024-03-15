import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useBarchartQuery } from './dashboardApi';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const BarChart = () => {
    const [dataMode, setDataMode] = useState('Week');
    const barchart = useBarchartQuery('mode=Month');

    if (barchart.isSuccess) {
        const data = {
            labels: Object.keys(barchart.data),
            datasets: [
                {
                    label: 'Dataset 1',
                    data: Object.keys(barchart.data).map(i => barchart.data[i]),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                // {
                //     label: 'Dataset 2',
                //     data: [0, 1, 2, 3],
                //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
                // },
            ],
        };
        // const [] = 
        return <Bar
            options={{
                // responsive: true,
                
                scales: {
                    xAxes: [{barThickness:100}],
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: { display: true, text: 'Chart.js' }
                }
            }}
            data={data}
        ></Bar>
    }
    else {
        return <h5>Loading</h5>
    }
}

const labels = ['1-MARCH-2024', '2-MARCH-2024', '3-MARCH-2024', '4-MARCH-2024'];


export { BarChart };