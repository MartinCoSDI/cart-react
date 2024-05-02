import React, { useEffect, useState } from "react";
import "./ThisYear.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
import Bar from "./PlotBar";

function Year() {

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

  useEffect(() => {
      fetchDatafunc('https://martinco.pythonanywhere.com/api/year', setYear_Data);
  },[])

  //http://127.0.0.1:5000/api/year_month_order_with_para
  const [value, setValue] = useState(null);
  useEffect(() => {
    fetchDatafunc('https://martinco.pythonanywhere.com/api/year/order_value', setValue);
},[])



    const [x_year, setX_Year] = useState(null);

    const [x_month, setX_Month] = useState(null);
    const handleYear = (event) => {
      setX_Year(event.target.value);
  }
    const handleMonth = (event) => {
          setX_Month(event.target.value);
  }

  //https://martinco.pythonanywhere.com/api/year_month_order_vendor_with_para
  const [vendor_value, setVendor_Value] = useState(null);
  useEffect(() => {
    fetchDatafunc('https://martinco.pythonanywhere.com/api/year_month_order_vendor_with_para', setVendor_Value);
  },[])

  const [vendor_year, setV_Year] = useState(null);

  const [vendor_month, setV_Month] = useState(null);
  const handleV_Year = (event) => {
    setV_Year(event.target.value);
}
  const handleV_Month = (event) => {
        setV_Month(event.target.value);
}



 //https://martinco.pythonanywhere.com/api/year_items
   const [item_year, setItem_Year] = useState(null);
   
   const handleItemYear = (event) => {
    setItem_Year(event.target.value);
}

  const [item, setItem] = useState(null);
  useEffect(() => {
    fetchDatafunc('https://martinco.pythonanywhere.com/api/year_items', setItem);
  },[])

  //https://martinco.pythonanywhere.com/api/delivery_rate_over_time
  const [x_datadeliveryrate, setX_DataDeliveryRate] = useState();
    
  const [y_datadeliveryrate, setY_DataDeliveryRate] = useState();
  
  useEffect(() =>{
      const fetchData = async() => {
          try {
              const response = await fetch('http://127.0.0.1:5000/api/delivery_rate_over_time');
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

   

  return (
    <section className='report'>
        <section className="report-section">
            <h1 className="title">
                Year Report
            </h1>
            <div className="analysis-section">
                <div className="stat-div">
                  {year_data ? (
                    <ul className ="stat-list-year">
                      {Object.entries(year_data).map(([key,value]) => (
                        
                        <li key={key} className="stat-li-year">
                            <p>{key}</p>
                            <p>{value}</p>
                        </li>
                      ))}
                       
                    </ul>
                  ) : 
                  (
                    <p>Loading...</p>
                  )
                  } 
                </div>
              </div>
              <div className="table">
                
                  <table id='data-table'>
                    <thead>
                      <tr>
                          
                      </tr>
                    </thead>
                  </table>
                    
              </div>
        </section>
        <section className="report-section">
            <h1 className="title">
                Order and Value per Month
            </h1>
            <div className="analysis-section">
                <label>Year:</label><input value={x_year} onChange={handleYear}></input>
            </div>
            <div className="grid-img-test" id = 'test'>
                {value && 
                    (
                                    value[x_year] && 
                                    (
                                    <TrendlineBar xaxis = {value[x_year].Month} yaxis ={value[x_year].Value} ybar ={value[x_year].Orders}  xname ='Month' yname = 'Orders' name = 'Orders over Month'></TrendlineBar>
                                    )
                    )
                }
                      </div>
        </section>

        <section className="report-section">
            <h1 className="title">
                Order and Value per Month
            </h1>
            <div className="analysis-section">
                <label>Year:</label><input value={x_year} onChange={handleYear}></input>
            </div>
            <div className="grid-img-test" id = 'test'>
                {value && 
                    (
                                    value[x_year] && 
                                    (
                                    <Bar xaxis = {value[x_year].Month} yaxis ={value[x_year].Order_Change} yaxis2 ={value[x_year].Value_Change}  xname ='Month' yname = 'Change' barname1="Order_Change" barname2="Value_Change" name = 'Orders over Month'></Bar>
                                    )
                    )
                }
                      </div>
        </section>

        <section className="report-section">
            <h1 className="title">
                Order per Vendors
            </h1>
            <div className="analysis-section">
                <label>Year:</label><input value={vendor_year} onChange={handleV_Year}></input>
                <label>Month:</label><input value={vendor_month} onChange={handleV_Month}></input>          
            </div>
            <div className="grid-img-test" id = 'test'>
                {vendor_value && 
                    (
                        vendor_value[vendor_year] && 
                        (vendor_value[vendor_year][vendor_month] && (
                        <BarHorizontal xaxis = {vendor_value[vendor_year][vendor_month].Orders} yaxis ={vendor_value[vendor_year][vendor_month].Vendor}  xname ='Orders' yname = 'Vendor' name = 'Orders over Month per Vendors'></BarHorizontal>
                        ))
                    )
                }
                      </div>
        </section>

        <section className="report-section">
            <h1 className="title">
                Items and Percentage Change per Month within Year
            </h1>
            <div className="analysis-section">
                <label>Year:</label><input value={item_year} onChange={handleItemYear}></input>
            </div>
            <div className="grid-img-test" id = 'test'>
                {item && 
                    (
                        item[item_year] && 
                        ((
                          <TrendlineBar xaxis = {item[item_year].Month} yaxis = {item[item_year].Items} ybar ={item[item_year].Percent_Change}  xname ='Month' yname = 'Items' name = 'Orders over Month'></TrendlineBar>

                          ))
                    )
                }
                      </div>
        </section>

        <section className="report-section">
            <h1 className="title">
                Delivery Rate
            </h1>
            
            <Trendline xaxis = {x_datadeliveryrate} yaxis ={y_datadeliveryrate} xname ='Month' yname = 'Percentage' name = 'Delivery Rate over Month'></Trendline>
            
        </section>
    </section>
  )
}

export default Year;
