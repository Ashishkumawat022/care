import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';

const DownloadPage = ({ rootElementById, downloadFileName, buttonName }) => {
    console.log(rootElementById, downloadFileName, buttonName)
    const downloadFileDocument = () => {
        const input = document.getElementById(rootElementById);
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "pt", "a4");
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save(`${downloadFileName}`);
        }).catch((error) => console.log(error))
    }

    return <div>
        <button onClick={downloadFileDocument}>{buttonName}</button>
    </div>
}

export default DownloadPage;