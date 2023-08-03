// import { useRouteMatch } from "react-router-dom";
import React, { useState, } from "react";
import Customdatatable from "../../components/customtable/customtable";



const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "name",
    },
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Email",
    },
    {
        id: "tel",
        numeric: true,
        disablePadding: false,
        label: "Tel",
    },
    {
        id: "creationdate",
        numeric: true,
        disablePadding: false,
        label: "Creation Date",
    },
    {
        id: "activationdate",
        numeric: true,
        disablePadding: false,
        label: "Activation Date",
    },
    {
        id: "deactivationdate",
        numeric: true,
        disablePadding: false,
        label: "Deactivation Date",
    },
    {
        id: "deletiondate",
        numeric: true,
        disablePadding: false,
        label: "Deletion Date",
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Status",
    },
];

export default function FriendsFamily() {
    const [rowsData, setRowsData] = useState([
        {
            id: '1',
            name: 'Michael Moore',
            email: 'michael@gmail.com',
            tel: '+443647777',
            creationdate: '-',
            activationdate: '-',
            deactivationdate: '-',
            deletiondate: '-',
            status: true,
            statusText: 'Active'
        },
        {
            id: '2',
            name: 'Billy Idol',
            email: 'billy@gmail.com',
            tel: '+446467896',
            creationdate: '-',
            activationdate: '-',
            deactivationdate: '-',
            deletiondate: '-',
            status: false,
            statusText: 'Deactivated'
        }
    ])

    // let { path, url } = useRouteMatch();
    return (
        <Customdatatable rowsData={rowsData} headCells={headCells} />
    );
}