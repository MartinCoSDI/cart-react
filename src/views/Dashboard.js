import React, {useState, useEffect, useRef} from 'react'
import "./Dashboard.css";
import axios from 'axios';
import Plot from 'react-plotly.js';
import Trendline from './PlotTrendLine';
function Dashboard() {
   
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


    //http://127.0.0.1:5000/api/data_full2024
    const [data_2023, setData_2023] = useState();
    
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/data_full2024', setData_2023);
    },[])


    //http://127.0.0.1:5000/api/data_2024
    const [data_2024, setData_2024] = useState();
    
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/data_2024', setData_2024);
    },[])


    //http://127.0.0.1:5000/api/delivery_rate
    const [delivery, setDelivery] = useState();
    
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/delivery_rate', setDelivery);
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

    //http://127.0.0.1:5000//api/order_trend_dashboard
    const [order, setOrder] = useState();
    
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/order_trend_dashboard', setOrder);
    },[])
   

    const [x_year, setX_Year] = useState(0);

    const handleYear = (event) => {
        setX_Year(event.target.value);
    }

    //{data ? <h1 className='title'>{data.message}</h1>:<h1 className='title'>Loading...</h1>}


  return (
    <section className='report'>
        <section className="report-section">
            <h1 className="title">
                Report Name
            </h1>
            <div className="analysis-section">
                <div className="stat-div">
                    <ul className ="stat-list">
                        <li className="stat-li">
                            <p className="stat-li-p">
                                Order
                                {data_2023 ? <span className="order-type">{data_2023.Total_Ord}</span>:<span className="order-type">Loading...</span>}
                            </p> 
                        </li>
                        <li className="stat-li">
                            <p className="stat-li-p">
                                Order
                                {data_2023 ? <span className="order-type">{data_2023.Total_O}</span>:<span className="order-type">Loading...</span>}
                            </p> 
                        </li>
                        <li className="stat-li">
                            <p className="stat-li-p">
                                Order
                                {data_2023 ? <span className="order-type">{data_2023.Total_C}</span>:<span className="order-type">Loading...</span>}
                            </p> 
                        </li>
                    </ul>
                </div>
              </div>
                
                <div className="note-section">
                    <h3 className="note-title">Note/Conclusion</h3>
                    <p className="note">Testing</p>
                </div>
                
                <div className="image">
                    <img src="" alt="img-source"/>
                </div>
                <div className="conclusion-section">
                    <h3 className="note-title">Note/Conclusion</h3>
                </div>
                <div className="grid-stat-section">
                    <div className="year_1">
                        <h3 className="note-title">Since 2023</h3>
                        <div className="stat-div">
                            <ul className="stat">
                                {data_2023 ? <li className="stat-img">{data_2023.Total_Ord}</li>:<li className="stat-img">Loading...</li>}

                                {data_2023 ? <li className="stat-img">{data_2023.Total_O}</li>:<li className="stat-img">Loading...</li>}

                                {data_2023 ? <li className="stat-img">{data_2023.Total_C}</li>:<li className="stat-img">Loading...</li>}
                                
                            </ul>
                        </div>
                        
                        <div className="grid-img">
                            {order && 
                                (
                                    order['2023'] && 
                                    (
                                    <Trendline xaxis = {order['2023'].month} yaxis ={order['2023'].order} xname ='Month' yname = 'Orders' name = 'Orders over Month'></Trendline>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="year_2">
                        <h3 className="note-title">Since 2024</h3>
                        <div className="stat-div">
                            <ul className="stat">
                                {data_2024 ? <li className="stat-img">{data_2024.Total_Ord}</li>:<li className="stat-img">Loading...</li>}

                                {data_2024 ? <li className="stat-img">{data_2024.Total_O}</li>:<li className="stat-img">Loading...</li>}

                                {data_2024 ? <li className="stat-img">{data_2024.Total_C}</li>:<li className="stat-img">Loading...</li>}
</ul>
                        </div>
                        <div className="grid-img">
                        {order && 
                                (
                                    order['2024'] && 
                                    (
                                    <Trendline xaxis = {order['2024'].month} yaxis ={order['2024'].order} xname ='Month' yname = 'Orders' name = 'Orders over Month'></Trendline>
                                    )
                                )
                            }
                      </div>
                </div>
            </div>
          </section>
        <section className="report-section">
            <h1 className="title">
                Delivery Rate
            </h1>
            
            <Trendline xaxis = {x_datadeliveryrate} yaxis ={y_datadeliveryrate} xname ='Month' yname = 'Percentage' name = 'Delivery Rate over Month'></Trendline>
            
        </section>
        <section className="report-section">
            <h1 className="title">
                Orders over Month
            </h1>
            <div className="analysis-section">
                <input value={x_year} onChange={handleYear}></input>
                
            </div>
            <div className="grid-img-test">
                {order && 
                    (
                                    order[x_year] && 
                                    (
                                    <Trendline xaxis = {order[x_year].month} yaxis ={order[x_year].order} xname ='Month' yname = 'Orders' name = 'Orders over Month'></Trendline>
                                    )
                    )
                }
                      </div>
        </section>
    </section>
  )
}

export default Dashboard
