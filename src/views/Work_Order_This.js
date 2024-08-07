import React, { useEffect, useState } from "react";
import "./Work_Order_This.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
import Bar_Single from "./PlotBar_Single";
import Plot from 'react-plotly.js';
import Pie from "./PieChart";

function Work_Order() {

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


    //http://127.0.0.1:5000/api/work_order/wo_total_by_month
    const [order, setOrder] = useState();
        
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/work_order/wo_total_by_month', setOrder);
    },[])

    //http://127.0.0.1:5000/api/work_order/wo_total_by_priority_code
    const [work_order, setWork_Order] = useState();
        
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/work_order/wo_total_by_priority_code', setWork_Order);
    },[])
  
    //http://127.0.0.1:5000/api/work_order/wo_total_by_requestor
    const [work_order_by_requestor, setWork_Order_by_Requestor] = useState();

    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/work_order/wo_total_by_requestor', setWork_Order_by_Requestor);
    },[])

    //http://127.0.0.1:5000/api/work_order/wo_total_by_requestor
    const [work_order_by_type_description, setWork_Order_by_Type_Description] = useState();

    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/work_order/wo_total_by_wo_type_description', setWork_Order_by_Type_Description);
    },[])

    //http://127.0.0.1:5000//api/work_order/wo_total_by_wo_total_by_building
    const [work_order_by_building, setWork_Order_by_Building] = useState();

    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/work_order/wo_total_by_wo_total_by_building', setWork_Order_by_Building);
    },[])


    if (work_order_data === null) {
        return <div>Loading...</div>
    }

    if (work_order === null) {
        return <div>Loading...</div>
    }

    if (work_order_by_requestor === null) {
        return <div>Loading...</div>
    }
    if (work_order_by_type_description === null) {
        return <div>Loading...</div>
    }
    if (work_order_by_building === null) {
        return <div>Loading...</div>
    }

  return (
    <section className="report">
        <div className="div-one">
            <div className="area one">

                {
                    Object.entries(work_order_data).map(([key,value]) => (
                    <div className="report-card" key={key}>
                        <h3 className="card-title">{key}</h3>
                        <p className="number">{value}</p>
                    </div>
                ))}
            </div>

            <div className="area two">
                <h3 className="card-title">This Year - Order Trend Monthly</h3>
                <div className="trendline">
                        {order &&
                                (
                                    <Trendline xaxis = {order.Month} yaxis ={order.Order} xname ='Month' yname = 'Orders' name = 'Orders over Month' width = {350} height={300}></Trendline>
                                )
                                
                            }
                </div>
            </div>  

            <div className="area two">
                <h3 className="card-title">This Year - Work Order by Code</h3>
                <div className="trendline">
                {work_order &&
                                (
                                    <Bar_Single xaxis={work_order.code} yaxis={work_order.value} xname = 'Code' yname = 'Value' name = '' width = {330} height={300}></Bar_Single>
                                )
                                
                            }
                </div>
            </div>     
        </div>


        <div className="div-one">
            <div className="area two">
                    {work_order_by_requestor &&
                                        (
                                            <h3 className="card-title">{work_order_by_requestor.title}</h3>
                                        )
                                        
                    }
                <div className="trendline">
                    {work_order_by_requestor &&
                            (
                                <Bar_Single xaxis={work_order_by_requestor.name} yaxis={work_order_by_requestor.value} xname = 'Code' yname = 'Value' name = '' width = {330} height={300}></Bar_Single>
                            )     
                    }
                </div>
            </div> 
            <div className="area two">
                    {work_order_by_type_description &&
                                (
                                    <h3 className="card-title">{work_order_by_type_description.title}</h3>
                                )
                                
                    }
                <p className="number">Notice the percentage is too low, so it will break the visualize of chart, to know more detail, you can hover to the chart.</p>
                <div className="trendline">
                    {work_order_by_type_description &&
                                    (
                                        <Pie value={work_order_by_type_description.value} label={work_order_by_type_description.name} width = {330} height={300}></Pie>
                                    )
                    }
                </div>
            </div>    
            <div className="area two">
                    {work_order_by_building &&
                                (
                                    <h3 className="card-title">{work_order_by_building.title}</h3>
                                )
                                
                    }
                <div className="trendline">
                    {work_order_by_building &&
                                (
                                    <Bar_Single xaxis={work_order_by_building.name} yaxis={work_order_by_building.value} xname = 'Code' yname = 'Value' name = '' width = {330} height={300}></Bar_Single>
                                )
                                
                    }
                </div>
            </div>  
        </div>
    </section>
    
  )
}

export default Work_Order;
