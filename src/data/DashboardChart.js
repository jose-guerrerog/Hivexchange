import React, {Component} from "react";
import Chart from 'react-apexcharts'

function DashboardChart(props) {

  const options = {
    series: props.data.series || [],
    title: {
      text: 'Profit per Month'
    },
    xaxis: {
      type: 'category',
      categories: props.data.categories || []
    },
    yaxis: [{
      title: {
        text: 'Amount ($)',
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
      offsetY: -15,
      style: {
        fontSize: '10px',
        colors: ["#304758"]
      }
    },
  };

  return (
    <div className="chart card-body pt-0">
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={'100%'}
        height={400}
      />
    </div>
  );
}

export default DashboardChart;
