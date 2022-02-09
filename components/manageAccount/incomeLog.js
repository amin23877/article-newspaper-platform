import styles from 'styles/components/manageAccount/IncomeLog.module.scss'
import { useCallback, useEffect, useState } from 'react';
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
      rtl: true,
      position: 'bottom',
      align: 'start',
      labels: {
                boxWidth: 12,
                boxHeight: 12,
                color: 'rgba(112, 108, 100, 1)',
                font: {
                    size: 12,
                    weight: 400,
                    family: 'IRANSans'
                },
              }
    },
    title: {
      display: true,
      color: 'rgba(36, 30, 18, 1)',
      font: {
        wheight: 500,
        size: 18,
        family: 'IRANSans',
      },
      position: 'bottom',
      text: 'نمایش محتوا',
    },
  },
  scales: {
        y: {
            max: 750,
            min: 150,
            grid: {
              display: false
            },
            ticks: {
                stepSize: 50,
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    switch(value) {
                      case 200:
                        return '200'
                      case 300:
                        return '300'
                      case 400:
                        return '400'
                      case 500:
                        return '500'
                      case 600:
                        return '600'
                      case 700:
                        return '700'
                    }
                }
            }
        },
        x: {
          grid: {
            display: false,
          }
        }
    },
};



const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'];

export const data = {
  labels,
  datasets: [
    {
      label: 'رایگان',
      data: labels.map(() => faker.datatype.number({ min: 150, max: 750 })),
      borderColor: 'rgba(21, 90, 97, 1)',
      backgroundColor: 'rgba(21, 90, 97, 1)',
    },
    {
      label: 'اشتراک دوره',
      data: labels.map(() => faker.datatype.number({ min: 150, max: 750 })),
      borderColor: 'red',
      backgroundColor: 'red',
    },
    {
      label: 'پرداخت',
      data: labels.map(() => faker.datatype.number({ min: 150, max: 750 })),
      borderColor: 'yellow',
      backgroundColor: 'yellow',
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
      const first = y.getPixelForValue(750)
      const second = y.getPixelForValue(650)
      const third = y.getPixelForValue(550)
      const forth = y.getPixelForValue(450)
      const fifth = y.getPixelForValue(350)
      const sixth = y.getPixelForValue(250)
      const seventh = y.getPixelForValue(150)
      ctx.save();
      ctx.fillStyle = 'rgba(21, 90, 97, 0.15)';
      ctx.fillRect(midX, second, right - midX, first - second);
      ctx.fillStyle = 'rgba(21, 90, 97, 0.19)';
      ctx.fillRect(midX, third, right - midX, second - third)
      ctx.fillStyle = 'rgba(21, 90, 97, 0.21)';
      ctx.fillRect(midX, forth, right - midX, third - forth)
      ctx.fillStyle = 'rgba(21, 90, 97, 0.29)';
      ctx.fillRect(midX, fifth, right - midX, forth - fifth)
      ctx.fillStyle = 'rgba(21, 90, 97, 0.32)';
      ctx.fillRect(midX, sixth, right - midX, fifth - sixth)
      ctx.fillStyle = 'rgba(21, 90, 97, 0.35)';
      ctx.fillRect(midX, seventh, right - midX, sixth - seventh)
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
            <Line options={options} data={data} />
        </div>
        </>
    )
}