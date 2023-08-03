import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#c580d1', '#34A853'],
        annotations: {
          position: "front",
        },
        legend: {
          show: false,
          customLegendItems: [
            "skldlfkasldk",
            "sdjhj",
            "sd",
            "sbd",
            "asbdamhms",
          ],
        },

        dataLabels: {
          enabled: false,
        },

        tooltip: {
          enabled: false,
        },
      },
      series: [100, 45],
    };
  }

  render() {

    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="100%" height="100%" />
      </div>
    );
  }
}

export default Donut2;
