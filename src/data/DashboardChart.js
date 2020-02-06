import React, {Component} from "react";
import { Card } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#424242',
    borderRadius: '3px',
  },
}));

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

  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={'100%'}
        height={400}
      />
    </Card>
  );
}

export default DashboardChart;
