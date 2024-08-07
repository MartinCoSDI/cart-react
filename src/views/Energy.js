import React, { useEffect, useState } from "react";
import "./Energy.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
import Bar_Single from "./PlotBar_Single";
import Plot from 'react-plotly.js';
import Pie from "./PieChart";
import Flip_Card from "./Flip_Card";
function Energy() {

  //https://martinco.pythonanywhere.com/api/today
    const [work_order_data, setWork_Order_Data] = useState(null);
    const fetchDatafunc  = async(url, dataset) => {
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            dataset(jsonData);
        }
        catch(error){
            console.error('Erro fetching data:' , error);
        }
    };

    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/work_order/wo_total', setWork_Order_Data);
    },[])


    const myArray = ['electric','gas','travel']
    const myList = myArray.map((item) => 
        <div className="div-one">
            <Flip_Card title={item} linkz = 'https://martinco.pythonanywhere.com//api/energy/energy_final'></Flip_Card>
        </div>
        )

  return (
    <section className="report">
        <div className="div-one">
            {myList}
        </div>
    </section>
    
  )
}

export default Energy;
