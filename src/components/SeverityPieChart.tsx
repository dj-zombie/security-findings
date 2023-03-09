import React, { Component } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Finding } from '../interfaces/finding'
ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
  data: Finding[];
}
interface Findings {
  [key: string]: any;
}
interface State {
  sortedData: Finding[];
  sortColumn: string;
}

let chartData = {
  labels: ['Critical', 'High', 'Medium', 'Low'],
  datasets: [
    {
      label: 'Severity',
      data: [0,0,0,0],
      backgroundColor: [
        'rgba(238, 130, 105, 1)',
        'rgba(246, 201, 88, 1)',
        'rgba(184, 205, 233, 1)',
        'rgba(169, 201, 139, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


class SeverityPieChart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // // Loop through each label in the chart data's labels array, and set the corresponding data point in the first dataset
    // to the count of occurrences of the current severity (converted to lowercase) in the given data props
    chartData.labels.forEach((severity, index) => {
      chartData.datasets[0].data[index] = this.countOccurrences(props.data, 'severity', severity.toLowerCase());
    });
  }

  /**
   * Counts the number of occurrences of objects in an array that have a specified key with a specified value.
   * @param array An array of objects in which occurrences are to be counted.
   * @param key The object key to be searched in the array.
   * @param value The value that needs to be compared against the value of the key.
   * @returns The count of objects in the array that have the specified key with the specified value.
   */
  countOccurrences = (array: Findings[], key: string, value: any): number => {
    return array.reduce((count, obj) => count + ((obj.hasOwnProperty(key) && obj[key] === value) ? 1 : 0), 0);
  }

  render() {
    return (
      <>
        <h3 className="text-2xl text-center">
          Findings by Severity
        </h3>
        <div className="relative">
          <Chart
            type='doughnut'
            className="w-96 m-auto"
            data={chartData}
           />
          <span className="absolute text-5xl text-center" style={{bottom: '110px', left: 'calc(50% - 32px)', color: 'rgb(238,130,105)'}}>
            { chartData.datasets[0].data[0] }
            <span className="ml-2 block text-xl">
              Critical
            </span>
          </span>
        </div>

      </>
    );
  }
}

export default SeverityPieChart;

