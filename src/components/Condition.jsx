import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const Condition = () => {
  const chartRef = useRef(null);
  const apexChart = useRef(null);

  useEffect(() => {
    const chartOptions = getChartOptions();

    if (chartRef.current) {
      apexChart.current = new ApexCharts(chartRef.current, chartOptions);
      apexChart.current.render();
    }

    return () => {
      if (apexChart.current) {
        apexChart.current.destroy();
      }
    };
  }, []);

  const getChartOptions = () => {
    return {
      series: [22.8, 16.8, 30.4, 10.7, 5.2],
      colors: ["#16BDCA", "#1C64F2", "#9061F9", "#FACC15", "#F77B7A"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Excellent", "Good", "Moderate", "Poor" , "Very Poor"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
        labels: {
            colors: '#9CA3AF',  // Change this to your desired color
            useSeriesColors: false, // If true, it uses the series colors for the legend
          },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
      },
    };
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-center my-4 items-center w-full">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold justify-center flex leading-none text-gray-900 dark:text-white me-1">Assets Condition</h5>
           
            <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
              
              <div data-popper-arrow></div>
            </div>
          </div>
        </div>
      
      </div>
      <div className="h-auto">
        <div className='text-white' ref={chartRef} id="pieChart"></div>
      </div>
    </div>
  );
};

export default Condition;
