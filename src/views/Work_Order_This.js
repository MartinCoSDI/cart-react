import React, { useEffect, useState } from "react";
import "./Work_Order_This.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
import Bar_Single from "./PlotBar_Single";
import Plot from 'react-plotly.js';

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
        fetchDatafunc('http://127.0.0.1:5000/api/work_order/wo_total', setWork_Order_Data);
    },[])


    
    const [order, setOrder] = useState();
        
    useEffect(() => {
        fetchDatafunc('http://127.0.0.1:5000/api/work_order/wo_total_by_month', setOrder);
    },[])

    const [work_order, setWork_Order] = useState();
        
    useEffect(() => {
        fetchDatafunc('http://127.0.0.1:5000/api/work_order/wo_total_by_priority_code', setWork_Order);
    },[])
  

   
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

     
    const [OTP, setOTP] = useState(0);
    const handleOTP = () => {
        const fetchData = async() => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/pwd');
                const jsonData = await response.json();
                setOTP(jsonData.pwd);
            }
            catch(error){
                console.error('Erro fetching data:' , error);
            }
        };
    
        fetchData();
    }
    const [ooo, setooo] = useState(null);
    const handleooo = (event) => {
        setooo(event.target.value);
        console.log(ooo);
        console.log(OTP);
    }
    const checkOTP = () => {
        if (Number(ooo) === Number(OTP)) {
            console.log("123456");

        }
        else{
            const fetchData = async() => {
                try {
                    const response = await fetch('http://127.0.0.1:5000/api/pwd');
                    const jsonData = await response.json();
                    setOTP(jsonData.pwd);
                }
                catch(error){
                    console.error('Erro fetching data:' , error);
                }
            };
        
            fetchData();
            console.log(OTP);
            setooo("");

        }
    }

    const handleEmail = async() => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/send-mail',
        {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:'martin.co@sdi.com',
                message: 'Hello, testing'
            })
        });
        if (response.ok){
            console.log('done')
        }
        else{
            console.error('failed')
        }
        }
        catch (error) {
            console.error('Error', error)
        }
    }

    if (vendors === null) {
        return <div>Loading...</div>
    }

    if (work_order_data === null) {
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
                <h3 className="card-title">Order Trend Monthly</h3>
                <div className="trendline">
                        {order &&
                                (
                                    <Trendline xaxis = {order.Month} yaxis ={order.Order} xname ='Month' yname = 'Orders' name = 'Orders over Month' width = {350} height={300}></Trendline>
                                )
                                
                            }
                </div>
            </div>  

            <div className="area two">
                <h3 className="card-title">Delivery Rate</h3>
                <p className="number">5,000</p>
                <div className="trendline">
                    <Bar_Single xaxis={work_order.code} yaxis={work_order.value} xname = 'Code' yname = 'Value' name = 'D' width = {330} height={300}></Bar_Single>
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

        <div className="div-one">
            <button onClick={handleOTP}>OTP sending</button>
            <p>{OTP}</p>
            <h1>{OTP}</h1>
            <label>Year:</label><input value={ooo} onChange={handleooo}></input>
            <button onClick={checkOTP}>Check</button>
            <button onClick={handleEmail}>Check</button>

        </div>
    </section>
    
  )
}

export default Work_Order;
