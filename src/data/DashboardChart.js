import React from "react";
import Chart from 'react-apexcharts';

function DashboardChart(props) {

  const options = {
    series: props.data.series || [],
    title: {
      text: 'Cash in-out per Month',
      style: {
        color: '#FFFFFF',
      }
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
      categories: props.data.categories || [],
    },
    yaxis: [{
      title: {
        text: 'Amount ($)',
        style: {
          color: '#FFFFFF',
        },
      },
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
      decimalsInFloat: 2
    }],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: val => val === 0 ? '' : val,
      offsetY: -10,
      style: {
        fontSize: '6.5px',
      }
    },
    legend: {
      labels: {
        colors: '#FFFFFF',
      },
    },
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="bar"
      width={'100%'}
      height={400}
    />
  );
}

export default DashboardChart;
