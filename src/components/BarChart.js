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
import { useBarchartQuery } from '../api/dashboardApi';
import {
    Button,
    VStack, ButtonGroup
} from '@chakra-ui/react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const Chart = () => {
    const [dataMode, setDataMode] = useState('Week');

    return <VStack>
        <ButtonGroup size='sm' isAttached variant='outline' marginLeft={'auto'}>
            <Button onClick={() => { setDataMode('Week') }}>Week</Button>
            <Button onClick={() => { setDataMode('Month') }}>Month</Button>
            <Button onClick={() => { setDataMode('Year') }}>Year</Button>
            {/* <IconButton aria-label='Add to friends' icon={<AddIcon />} /> */}
        </ButtonGroup>
        <ButtonGroup size='sm' isAttached variant='outline' marginLeft={'auto'}>
            <Button>{'<'}</Button>
            <Button>{''}</Button>
            <Button>{'>'}</Button>
            {/* <IconButton aria-label='Add to friends' icon={<AddIcon />} /> */}
        </ButtonGroup>
        <BarChart mode={dataMode}></BarChart>
    </VStack>
}
const BarChart = (props) => {
    const barchart = useBarchartQuery('mode=' + props.mode);

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
                    xAxes: [{ barThickness: 100 }],
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