import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

import styles from "styles/components/manageAccount/IncomeLog.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      rtl: true,
      position: "bottom",
      align: "start",
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        color: "rgba(112, 108, 100, 1)",
        font: {
          size: 12,
          weight: 400,
          family: "IRANSans",
        },
      },
    },
    title: {
      display: true,
      color: "rgba(36, 30, 18, 1)",
      font: {
        weight: 500,
        size: 18,
        family: "IRANSans",
      },
      position: "bottom",
      text: "نمایش محتوا",
    },
  },
  scales: {
    y: {
      max: 750,
      min: 150,
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 50,
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          switch (value) {
            case 200:
              return "200";
            case 300:
              return "300";
            case 400:
              return "400";
            case 500:
              return "500";
            case 600:
              return "600";
            case 700:
              return "700";
          }
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
];

export const data = {
  labels,
  datasets: [
    {
      label: "درآمد",
      data: labels.map(() => faker.datatype.number({ min: 150, max: 750 })),
      borderColor: "rgba(21, 90, 97, 1)",
      backgroundColor: "rgba(21, 90, 97, 1)",
    },
    {
      label: "پرداخت",
      data: labels.map(() => faker.datatype.number({ min: 150, max: 750 })),
      borderColor: "red",
      backgroundColor: "red",
    },
  ],
};

export default function IncomeChart() {
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    const handleResizeChart = () => {
      if (window.innerWidth < 500) {
        setOptions((p) => ({ ...p, aspectRatio: 1 }));
      } else if (options.aspectRatio === 1) {
        setOptions((p) => ({ ...p, aspectRatio: 2 }));
      }
    };

    window.addEventListener("resize", handleResizeChart);

    return () => {
      window.removeEventListener("resize", handleResizeChart);
    };
  }, []);

  useEffect(() => {
    ChartJS.register({
      id: "quadrants",
      beforeDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { left, top, right, bottom },
          scales: { x, y },
        } = chart;
        const midX = x.getPixelForValue(0);
        const first = y.getPixelForValue(750);
        const second = y.getPixelForValue(650);
        const third = y.getPixelForValue(550);
        const forth = y.getPixelForValue(450);
        const fifth = y.getPixelForValue(350);
        const sixth = y.getPixelForValue(250);
        const seventh = y.getPixelForValue(150);
        ctx.save();
        ctx.fillStyle = "rgba(21, 90, 97, 0.15)";
        ctx.fillRect(midX, second, right - midX, first - second);
        ctx.fillStyle = "rgba(21, 90, 97, 0.19)";
        ctx.fillRect(midX, third, right - midX, second - third);
        ctx.fillStyle = "rgba(21, 90, 97, 0.21)";
        ctx.fillRect(midX, forth, right - midX, third - forth);
        ctx.fillStyle = "rgba(21, 90, 97, 0.29)";
        ctx.fillRect(midX, fifth, right - midX, forth - fifth);
        ctx.fillStyle = "rgba(21, 90, 97, 0.32)";
        ctx.fillRect(midX, sixth, right - midX, fifth - sixth);
        ctx.fillStyle = "rgba(21, 90, 97, 0.35)";
        ctx.fillRect(midX, seventh, right - midX, sixth - seventh);
        ctx.restore();
      },
    });
  }, []);

  return (
    <div className={styles.chart}>
      <Line options={options} data={data} />
    </div>
  );
}
