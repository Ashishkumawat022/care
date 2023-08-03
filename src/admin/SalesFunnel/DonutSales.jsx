import React from 'react';
import Chart from 'react-apexcharts';

export default function DonutSales(props) {
    const { colors, series } = props;

    let colorarray = ['#c580d1', '#219653', '#2f80ed', '#818181', '#eb5757', '#42c369'];

    const options = {
        colors: colors,
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
                "aaa",
            ],
        },

        dataLabels: {
            enabled: false,
        },

        tooltip: {
            enabled: false,
        },
    };


    return (
        <div className="donut">
            <Chart options={options} series={series} type="donut" width="100%" height="100%" />
        </div>
    )
}

