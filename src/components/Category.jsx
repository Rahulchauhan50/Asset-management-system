import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import {  useGetAssetValueQuery } from '../redux/services/UserApi';


const Category = () => {
    const { data: assetValue} = useGetAssetValueQuery();  // console.log(data)
  

    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (assetValue) {
            setSeries([
                assetValue.Creative || 0,
                assetValue.CS || 0,
                assetValue.Sales || 0,
                assetValue.Finance || 0,
                assetValue.HR || 0,
                assetValue.It || 0,
                assetValue.Admin || 0,
                assetValue.Digital || 0,
                assetValue.Management || 0,
                assetValue.other || 0,
            ]);
        }
    }, [assetValue]);
  const getChartOptions = () => {
    return {
      series,

      colors: ["#1C64F2", "#189AB4", "#FDBA8C", "#E74694", "#274472", "#D3B5E5", "#0000FF", "#A45C40", "#F51720", "#05445E"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,

              },
              total: {
                showAlways: true,
                show: true,
                label: "Total value",

                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return '₹' + sum;
                },
                color: "#FFFFFF",
                style: {
                  color: "#FFFFFF", // Change this to your desired color
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value) {
                  return "₹" + value ;
                },
                color: "#FFFFFF",

              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },

      labels: ["Creative",
        "CS",
        "Sales",
        "Finance",
        "HR",
        "It",
        "Admin",
        "Digital",
        "Management",
        "other"],
      dataLabels: {
        enabled: false,
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
            return "₹" +  value ;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return "₹" +  value ;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      switch (value) {
        case 'desktop':
          setSeries([15.1, 22.5, 4.4, 8.4]);
          break;
        case 'tablet':
          setSeries([25.1, 26.5, 1.4, 3.4]);
          break;
        case 'mobile':
          setSeries([45.1, 27.5, 8.4, 2.4]);
          break;
        default:
          setSeries([55.1, 28.5, 1.4, 5.4]);
      }
    } else {
      setSeries([35.1, 23.5, 2.4, 5.4]);
    }
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        {console.log()}
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Assets value</h5>
          <svg
            data-popover-target="chart-info"
            data-popover-placement="bottom"
            className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
          </svg>
          <div
            data-popover
            id="chart-info"
            role="tooltip"
            className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          >
            <div className="p-3 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
              <p>
                Report helps navigate cumulative growth of community activities. Ideally, the chart should have a
                growing trend, as stagnating chart signifies a significant decrease of community activity.
              </p>
              <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
              <p>
                For each date bucket, the all-time volume of activities is calculated. This means that activities in
                period n contain all activities up to period n, plus the activities generated by your community in
                period.
              </p>
              <a
                href="#"
                className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
              >
                Read more{' '}
                <svg
                  className="w-2 h-2 ms-1.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </div>
            <div data-popper-arrow></div>
          </div>
        </div>
        <div>
          <button
            type="button"
            data-tooltip-target="data-tooltip"
            data-tooltip-placement="bottom"
            className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"
          >
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
              />
            </svg>
            <span className="sr-only">Download data</span>
          </button>
          <div
            id="data-tooltip"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Download CSV
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>

      <div>
        {/* <div className="flex" id="devices">
          <div className="flex items-center me-4">
            <input
              id="desktop"
              type="checkbox"
              value="desktop"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="desktop" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Desktop
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="tablet"
              type="checkbox"
              value="tablet"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="tablet" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Tablet
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="mobile"
              type="checkbox"
              value="mobile"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="mobile" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Mobile
            </label>
          </div>
        </div> */}
      </div>
      <div className="py-6" id="donut-chart">
        <ReactApexChart options={getChartOptions()} series={series} type="donut" height={320} />
      </div>
    </div>
  );
};

export default Category;
