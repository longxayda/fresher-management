import React from "react";
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
function Barchart({chartdata}){
    return (
        <Bar data={chartdata}/>
    )
}
export default Barchart