import React, { useEffect, useState } from "react";
import "./This.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
import Bar from "./PlotBar";
import Plot from 'react-plotly.js';

function This() {

  //https://martinco.pythonanywhere.com/api/today
    const [year_data, setYear_Data] = useState(null);
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

    const [order, setOrder] = useState();

    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/year', setYear_Data);
    },[])
        
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/order_trend_dashboard', setOrder);
    },[])
  

    //http://127.0.0.1:5000/api/delivery_rate_over_time
    const [x_datadeliveryrate, setX_DataDeliveryRate] = useState();
    
    const [y_datadeliveryrate, setY_DataDeliveryRate] = useState();
        
    useEffect(() =>{
        const fetchData = async() => {
            try {
                const response = await fetch('https://martinco.pythonanywhere.com/api/delivery_rate_over_time');
                const jsonData = await response.json();
                setX_DataDeliveryRate(jsonData.Total);
                setY_DataDeliveryRate(jsonData.Tatol);
            }
            catch(error){
                console.error('Erro fetching data:' , error);
            }
        };
    
        fetchData();
    },[]);
   
    //https://martinco.pythonanywhere.com/api/year_items
    const [item_year, setItem_Year] = useState(2024);
   
    const handleItemYear = (event) => {
        setItem_Year(event.target.value);
    }

    const [item, setItem] = useState(null);
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/year_items', setItem);
    },[])

    //http://127.0.0.1:5000/api/top_5_vendor
    const [vendors, setVendor] = useState(null);
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/top_5_vendor', setVendor);
    },[])

    if (vendors === null) {
        return <div>Loading...</div>
    }

    if (year_data === null) {
        return <div>Loading...</div>
    }

    

  return (
    <section className="report">
        <div className="div-one">
            <div className="area one">

                {
                    Object.entries(year_data).map(([key,value]) => (
                    <div className="report-card" key={key}>
                        <h3 className="card-title">{key}</h3>
                        <p className="number">{value}</p>
                    </div>
                ))}
            </div>

            <div className="area two">
                <h3 className="card-title">Value and Quantity Trend Monthly</h3>
                <div className="trendline">
                        {order && 
                                (
                                    order['2024'] && 
                                    (
                                    <Trendline xaxis = {order['2024'].month} yaxis ={order['2024'].order} xname ='Month' yname = 'Orders' name = 'Orders over Month' width = {350} height={300}></Trendline>
                                    )
                                )
                            }
                </div>
            </div>  

            <div className="area two">
                <h3 className="card-title">Delivery Rate</h3>
                <p className="number">5,000</p>
                <div className="trendline">
                    <Trendline xaxis = {x_datadeliveryrate} yaxis ={y_datadeliveryrate} xname ='Month' yname = 'Percentage' name = 'Delivery Rate over Month' width = {350} height={300}></Trendline>
                </div>
            </div>     
        </div>

        <div className="div-one">
            <div className="area two gau">
                <Plot className='data-delivery'
            data={[
                {
                type: "indicator",
                mode: "gauge+number+delta",
                value: 120,
                title: { text: "Speed", font: { size: 12 } },
                delta: { reference: 200, increasing: { color: "RebeccaPurple" } },
                gauge: {
                    axis: { range: [null, 200], tickwidth: 2, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray"
                }
                }
            ]}
            layout={ {
                width: 350,
                height: 400,
                paper_bgcolor:'rgba(0,0,0,0)',
                plot_bgcolor:'rgba(0,0,0,0)',
                font: { color: "darkblue", family: "Arial" }
            }}
        />
                
            </div>

            <div className="area two">
                <h3 className="card-title">Value and Quantity Percentage Change Over Month</h3>
                <div className="grid-img-test" id = 'test'>
                {item && 
                    (
                        item[item_year] && 
                        ((
                          <TrendlineBar xaxis = {item[item_year].Month} yaxis = {item[item_year].Items} ybar ={item[item_year].Percent_Change}  xname ='Month' yname = 'Items' name = 'Orders over Month' width = {350} height={300}></TrendlineBar>

                          ))
                    )
                }
                </div>
            </div>  

            <div className="area two">
                <h3 className="card-title">Top 5 vendors</h3>
                <p className="number">5,000</p>
                
                
                <table>
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Quantity</th>
                            <th>Spend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vendors.map((vendor, index) => 
                            (
                                <tr key={index}>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.quantity}</td>
                                    <td>{vendor.value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
                
                
            </div>     
        </div>
    </section>
    
  )
}

export default This;
