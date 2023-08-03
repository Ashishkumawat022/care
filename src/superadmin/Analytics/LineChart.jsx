import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import '../Analytics/analytics.css';
import ReactApexChart from 'react-apexcharts';

export default function LineChart(props) {
    const { title, filterType, dailyBasisVals, weekDayNames, customDates, navigateLink } = props;

    const history = useHistory();

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['', '4AM', '8AM', '12AM', '4PM', '8PM', '12PM'],
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#585858'
                },
            },
        ],
    });
    const [series, setSeries] = useState([{
        name: 'Revenue',
        data: [0, 0, 0, 0, 0, 0, 0]
    }]);

    useEffect(() => {
        if (filterType === 'today') {
            setOptions({
                ...options, xaxis: {
                    categories: ['0', '4AM', '8AM', '12AM', '4PM', '8PM', '12PM'],
                },
                title: {
                    text: 'Trends by Today',
                    align: 'left'
                },
            });
        } else if (filterType === 'week') {
            setOptions({
                ...options, xaxis: {
                    categories: weekDayNames
                },
                title: {
                    text: 'Trends by Week',
                    align: 'left'
                },
            });
        } else if (filterType === 'custom') {
            setOptions({
                ...options, xaxis: {
                    categories: customDates
                },
                title: {
                    text: 'Trends by Date',
                    align: 'left'
                },
            });
            // history.push("/superadmin/reports");
        }
        setSeries([{
            name: title,
            data: dailyBasisVals
        }])
    }, [filterType, dailyBasisVals])

    return (
        <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
            <div className="card dashboard_card card_border">
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <div className="graph_box">
                        <div id="chart">
                            <ReactApexChart options={options} series={series} type="line" height={350} />
                        </div>
                    </div>
                    <NavLink to={navigateLink} className="link">Sell All</NavLink>
                </div>
            </div>
        </div>
    )
}
