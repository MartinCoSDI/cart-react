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
