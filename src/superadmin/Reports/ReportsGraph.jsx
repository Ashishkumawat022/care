import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './reports.module.css';

let today = new Date();
let helperArrDate = [];

export default function ReportsGraph(props) {

    const { dateRange, graphStaticData, selectedSubCat, selectedCat, selectedLabel, selectedNameData } = props;
    const [startDate, endDate] = dateRange;

    const [options, setOptions] = useState({
        chart: {
            height: 500,
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
            text: '',
            align: 'left'
        },
        grid: {
            show: true,
            borderColor: '#F0F0F0',
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
        xaxis: {
            categories: [],
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
            },
        ],
    });
    const [series, setSeries] = useState([{
        name: 'Revenue',
        data: [0, 0, 0, 0, 0, 0, 0]
    }]);

    useEffect(() => {
        if (startDate && endDate && Object.keys(graphStaticData).length !== 0) {
            graphsFilter();
        }
    }, [graphStaticData, dateRange, selectedSubCat, selectedNameData]);

    function graphsFilter() {
        cutomizeHz();
        let verticalAxisArr = [];
        let timeKey = 'created_at';
        if (selectedSubCat === 'newSignUps') {
            timeKey = 'updatedAt';
        }
        // const arrayUniqueByKey = [...new Map(array.map(item =>
        //     [item.age, item])).values()];
        // const unique = [...new Set(graphStaticData[selectedSubCat].map((item) => item.adminId))];

        if (selectedCat === 'Subscriptions') {
            if (selectedSubCat === 'newSignUps' || selectedSubCat === 'activations' || selectedSubCat === 'cancellations') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let filterLength = graphStaticData[selectedSubCat].filter(
                        filterByDateRange(helperArrDate[i], timeKey)
                    ).length;
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push(verticalAxisArr[i - 1] <= filterLength ? filterLength : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(filterLength);
                    }
                }
            } else if (selectedSubCat === 'ChurnRate') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let activationsLength = graphStaticData.activations.filter(
                        filterByDateRange(helperArrDate[i], "created_at")
                    ).length;
                    let cancellationsLength = graphStaticData.cancellations.filter(
                        filterByDateRange(helperArrDate[i], "created_at")
                    ).length;
                    let churnCount = 0;
                    if (churnCount > 0) {
                        let churnCount = (cancellationsLength * 100) / activationsLength;
                        verticalAxisArr.push(verticalAxisArr[i - 1] <= churnCount ? churnCount : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(churnCount);
                    }
                }
            } else if (selectedSubCat === 'DeadTrials') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let deadTrialsLength = graphStaticData.deadTrialArray.filter(
                        filterByDateRange(helperArrDate[i], "createdAt")
                    ).length;
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push(verticalAxisArr[i - 1] <= deadTrialsLength ? deadTrialsLength : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(deadTrialsLength);
                    }
                }
            } else if (selectedSubCat === 'TrialsInProgress') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let deadTrialsLength = graphStaticData.trialActiveArray.filter(
                        trialsActiveFilter(helperArrDate[i])
                    ).length;
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push(verticalAxisArr[i - 1] <= deadTrialsLength ? deadTrialsLength : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(deadTrialsLength);
                    }
                }
            }
        } else if (selectedCat === 'Revenue') {
            if (selectedSubCat === 'MRR' || selectedSubCat === 'ARPU') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let arpu = graphStaticData.ARPU.filter(
                        filterByDateRangeArpu(helperArrDate[i], "created_at")
                    );
                    let arpuCount = 0;
                    if (arpu.length > 0) {
                        arpu.forEach((elem) => {
                            arpuCount = arpuCount + elem.amount / arpu.length;
                        });
                    }
                    let mrrCount = arpuCount * arpu.length;
                    if (selectedSubCat === 'ARPU') {
                        if (verticalAxisArr.length > 0) {
                            verticalAxisArr.push((verticalAxisArr[i - 1] <= arpuCount.toFixed(2)) ? arpuCount.toFixed(2) : verticalAxisArr[i - 1]);
                        } else {
                            verticalAxisArr.push(arpuCount.toFixed(2));
                        }
                    } else {
                        if (verticalAxisArr.length > 0) {
                            verticalAxisArr.push((verticalAxisArr[i - 1] <= mrrCount.toFixed(2)) ? mrrCount.toFixed(2) : verticalAxisArr[i - 1]);
                        } else {
                            verticalAxisArr.push(mrrCount.toFixed(2));
                        }
                    }
                }
            } else if (selectedSubCat === 'MSCR') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let freeClientUpgradLength = graphStaticData.userUpgradedPlans.filter(
                        filterByDateRange(helperArrDate[i], "dateOfPlanupgrade")
                    ).length;
                    let freeClientLength = graphStaticData.freePlanUsers.filter(
                        filterByDateRange(helperArrDate[i], "createdAt")
                    ).length;
                    let mscrLength = (freeClientUpgradLength / (freeClientLength ? freeClientLength : 1)) * 100;
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push(verticalAxisArr[i - 1] <= mscrLength ? mscrLength : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(mscrLength);
                    }
                }
            } else if (selectedSubCat === 'TotalRevenue') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let arpu = graphStaticData.ARPU.filter(
                        filterByDateRangeArpu(helperArrDate[i], "created_at")
                    );
                    let totalRevenue = 0;
                    if (arpu.length > 0) {
                        arpu.forEach((elem) => {
                            totalRevenue = totalRevenue + elem.amount;
                        });
                    }
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push((verticalAxisArr[i - 1] <= totalRevenue.toFixed(2)) ? totalRevenue.toFixed(2) : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(totalRevenue.toFixed(2));
                    }
                }
            } else if (selectedSubCat === 0 || selectedSubCat === 1 || selectedSubCat === 2) {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let filterData = graphStaticData.allCharges.filter(
                        filterByDateRange(helperArrDate[i], 'charge_date')
                    );
                    let cummAmount = 0;
                    filterData.forEach(item => {
                        if (item?.carehomedata?.chargesDetails[selectedSubCat]?.amount) {
                            cummAmount = cummAmount + +item?.carehomedata?.chargesDetails[selectedSubCat]?.amount
                        }
                    });
                    verticalAxisArr.push(cummAmount);
                    // if (verticalAxisArr.length > 0) {
                    //     verticalAxisArr.push(verticalAxisArr[i - 1] <= cummAmount ? cummAmount : verticalAxisArr[i - 1]);
                    // } else {
                    // }
                }
            } else if (selectedSubCat === 'CountryWise' && selectedNameData) {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let revenue = graphStaticData.allCharges.filter(
                        filterByNameRevenue(helperArrDate[i], "charge_date", selectedNameData.value, 'country')
                    );
                    let totalRevenue = 0;
                    if (revenue.length > 0) {
                        revenue.forEach((elem) => {
                            totalRevenue = totalRevenue + elem.amount;
                        });
                    }
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push((verticalAxisArr[i - 1] <= totalRevenue.toFixed(2)) ? totalRevenue.toFixed(2) : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(totalRevenue.toFixed(2));
                    }
                }
            } else if (selectedSubCat === 'RevenueByClient' && selectedNameData) {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let revenue = graphStaticData.allCharges.filter(
                        filterByNameRevenue(helperArrDate[i], "charge_date", selectedNameData.value, 'adminId')
                    );
                    let totalRevenue = 0;
                    if (revenue.length > 0) {
                        revenue.forEach((elem) => {
                            totalRevenue = totalRevenue + elem.amount;
                        });
                    }
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push((verticalAxisArr[i - 1] <= totalRevenue.toFixed(2)) ? totalRevenue.toFixed(2) : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(totalRevenue.toFixed(2));
                    }
                }
            } else if (selectedSubCat === 'SalesPerson' && selectedNameData) {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let revenue = graphStaticData.allCharges.filter(
                        filterByNameRevenue(helperArrDate[i], "charge_date", selectedNameData.value, 'salesPerson')
                    );
                    let totalRevenue = 0;
                    if (revenue.length > 0) {
                        revenue.forEach((elem) => {
                            totalRevenue = totalRevenue + elem.amount;
                        });
                    }
                    if (verticalAxisArr.length > 0) {
                        verticalAxisArr.push((verticalAxisArr[i - 1] <= totalRevenue.toFixed(2)) ? totalRevenue.toFixed(2) : verticalAxisArr[i - 1]);
                    } else {
                        verticalAxisArr.push(totalRevenue.toFixed(2));
                    }
                }
            }
        } else if (selectedCat === 'Clients') {
            for (let i = 0; i < helperArrDate.length; i++) {
                let filterLength = graphStaticData[selectedSubCat].filter(
                    filterByDateRange(helperArrDate[i], 'createdAt')
                ).length;
                if (verticalAxisArr.length > 0) {
                    verticalAxisArr.push(verticalAxisArr[i - 1] <= filterLength ? filterLength : verticalAxisArr[i - 1]);
                } else {
                    verticalAxisArr.push(filterLength);
                }
            }
        } else if (selectedCat === 'Payments') {
            if (selectedSubCat === 'paymentFailure') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let paymentFailLength = graphStaticData.allFailedPayments.filter(
                        paymentFilter(helperArrDate[i], 'created')
                    ).length;
                    verticalAxisArr.push(paymentFailLength);
                }
            } else if (selectedSubCat === 'Refunds') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let paymentRefundLength = graphStaticData.allRefunds.filter(
                        paymentFilter(helperArrDate[i], 'created')
                    ).length;
                    verticalAxisArr.push(paymentRefundLength);
                }
            } else if (selectedSubCat === 'DaysToPayment') {
                for (let i = 0; i < helperArrDate.length; i++) {
                    let paymentRefundLength = graphStaticData.daysToPaymentArray.filter(
                        paymentFilter(helperArrDate[i], 'created')
                    ).length;
                    verticalAxisArr.push(paymentRefundLength);
                }
            }
        }
        setSeries([{
            name: selectedLabel,
            data: verticalAxisArr
        }])
    }

    function trialsActiveFilter(dateVal) {
        return function (item) {
            let trialStrt = new Date(item.trial_start).getTime() * 1000;
            let trialEnd = new Date(item.trial_end).getTime() * 1000;
            return trialStrt <= endDate.getTime() && trialStrt >= dateVal.getTime() && trialEnd >= dateVal.getTime();
        };
    }

    function paymentFilter(dateVal, dateKey) {
        return function (item) {
            let dataDate = item[dateKey] ? new Date(item[dateKey]).getTime() * 1000 : new Date(item.charge_date).getTime();
            let stDate = startDate.getTime();
            let hzDate = new Date(dateVal).getTime();
            return dataDate >= stDate && dataDate <= hzDate;
        };
    }

    function filterByNameRevenue(dateVal, dateKey, searchKey, type) {
        return function (item) {
            let dataDate = new Date(item[dateKey]).getTime();
            let stDate = startDate.getTime();
            let hzDate = new Date(dateVal).getTime();
            return dataDate >= stDate && dataDate <= hzDate && searchKey === item.carehomedata?.[type];
        };
    }


    function filterByDateRange(dateVal, dateKey) {
        return function (item) {
            let dataDate = new Date(item[dateKey]).getTime();
            let stDate = startDate.getTime();
            let hzDate = new Date(dateVal).getTime();
            return dataDate >= stDate && dataDate <= hzDate;
        };
    }

    function filterByDateRangeArpu(dateVal, dateKey) {
        return function (item) {
            let dataDate = new Date(
                item[dateKey] ? item[dateKey] : item["created"]).getTime();
            let stDate = startDate.getTime();
            let hzDate = new Date(dateVal).getTime();
            return (
                dataDate >= stDate && dataDate <= hzDate && item.status === "active"
            );
        };
    }

    function cutomizeHz() {
        helperArrDate = [];
        let customBasedHz = [];
        const getDateDifference = (date1, date2) => {
            const diffTime = Math.abs(date2 - date1);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        };
        let difference = getDateDifference(startDate, endDate);
        let denominator = 6;
        if (14 > difference >= 7) {
            denominator = 7;
        } else if (difference >= 14) {
            denominator = 10;
        }
        let custumInterval = Math.ceil(difference / denominator);
        for (let i = 0; i < denominator; i++) {
            let finalDate = new Date(startDate);
            if (i > 0) {
                let dayByInterval = helperArrDate[0].getDate() + custumInterval * i;
                finalDate.setDate(dayByInterval);
                if (finalDate.getTime() >= endDate.getTime()) {
                    finalDate = new Date(endDate);
                }
            }
            helperArrDate.push(finalDate);
            let changedFormat = finalDate
                .toJSON()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");
            customBasedHz.push(finalDate.toDateString().slice(4, 15)
                .split(" ")
                .join("-"));
            if (finalDate.getTime() >= endDate.getTime()) {
                break;
            }
        }
        setOptions((prevState) => {
            return {
                ...prevState,
                xaxis: {
                    categories: customBasedHz,
                },
                title: {
                    text: selectedLabel.toUpperCase(),
                    align: 'left'
                },
            }
        });
    }


    return (
        <div className={`graph_box ${styles.graphdiv}`}>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={500} />
            </div>
        </div>
    )
}
