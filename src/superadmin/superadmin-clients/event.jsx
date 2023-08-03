import React, { useEffect, useState } from 'react';
import AllEvents from '../AllActivity/AllEvents';
import { fetchGet } from "../../Apis/commonApis";
import { useLocation } from "react-router-dom";

export default function Event() {
    const location = useLocation();
    // const myparam = location.state.params;

    const [rows, setRows] = useState([]);
    const [stripeEvents, setStripeEvents] = useState([]);
    const [goCardEvents, setGoCardEvents] = useState([]);
    const [manualEvents, setManualEvents] = useState([]);

    useEffect(() => {
        getStripeEvents();
        getGoCardEvents();
        getManualEvents();
    }, []);

    useEffect(() => {
        let newArray = [];
        newArray = newArray.concat(stripeEvents, goCardEvents, manualEvents);
        setRows(newArray);
    }, [stripeEvents, goCardEvents, manualEvents])

    const getStripeEvents = async () => {
        const result = await fetchGet('listAllEvents');
        let eventData = result.data.data;
        let rowData = [];
        eventData.forEach((elem, i) => {
            rowData.push({
                id: elem.id,
                eventType: elem.type,
                time: elem.created,
                source: 'Stripe',
                eventId: `101STRIPE_SUB100${i + 1}`
            })
        });
        setStripeEvents(rowData);
    }

    const getGoCardEvents = async () => {
        const result = await fetchGet('gocardLessEvents');
        let eventData = result.data.events;
        let rowData = [];
        eventData.forEach((elem, i) => {
            rowData.push({
                id: elem.id,
                eventType: elem.action,
                time: elem.created_at,
                source: 'GoCardless',
                eventId: `101GOCARDLESS_SUB10${i + 1}`
            })
        });
        setGoCardEvents(rowData)
    }

    const getManualEvents = async () => {
        const result = await fetchGet('getManualEvents');
        let eventData = result.data;
        let rowData = [];
        eventData.forEach((elem, i) => {
            if (elem.action === null) {
                rowData.push({
                    id: elem._id,
                    eventType: elem.eventType,
                    time: elem.createdAt,
                    source: 'Manual',
                    eventId: elem.eventId
                })
            }
        });
        setManualEvents(rowData)
    }

    return (
        <AllEvents rows={rows} />
    )
}
