import React, { useEffect, useState } from "react";
import "./This.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
import Bar from "./PlotBar";
import Plot from 'react-plotly.js';
import Gadget from "./gadget";

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

    const [shipping_days, setShipping_Days] = useState(null);
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/date_ship', setShipping_Days);
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
                <Gadget className='data-delivery' min ={shipping_days.start} middle_1 = {shipping_days.mid_1} middle_2 = {shipping_days.mid_2} max ={shipping_days.end}/>
                
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

export default This;
