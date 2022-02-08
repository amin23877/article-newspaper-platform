import styles from 'styles/components/manageAccount/IncomeLog.module.scss'
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  }
};



const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 200, max: 700 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 200, max: 700 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function IncomeLog () {

    const statusList = [
        {
            title: 'درآمد از اشتراک ها',
            value: 8543133
        },
        {
            title: 'درآمد از پرداخت',
            value: 508431
        },
        {
            title: 'کل درآمد ها',
            value: 251956355
        }
    ]

    useEffect(() => {
    ChartJS.register({
  id: 'quadrants',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
    const midX = x.getPixelForValue(0);
    const midY = y.getPixelForValue(0);
    const test1 = y.getPixelForValue(600)
    const test2 = y.getPixelForValue(700)
    console.log('top: ', top)
    console.log('midX: ', midX)
    // console.log('top: ', top)
    // console.log('right: ', right)
    ctx.save();
    ctx.fillStyle = 'rgba(21, 90, 97, 0.15)';
    ctx.fillRect(midX, top - (test2 - test1), right - midX, test2 - test1);
    ctx.restore();
  }
});
  }, []);

    return (
        <>
        <div className={styles.statusContainer}>
            {statusList.map((status) => {
                return (
                    <div className={styles.status} key={status.title}>
                        <div>{status.title}</div>
                        <div className={styles.value}>{`${status.value} تومان`}</div>
                    </div>
                )
            })}
        </div>
        <div className={styles.chart}>
            chart
            <Line options={options} data={data} />
        </div>
        </>
    )
}