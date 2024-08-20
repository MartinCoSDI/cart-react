import React, { useEffect, useState } from "react";
import "./ThisWeek.css";

function Week() {

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

  //https://martinco.pythonanywhere.com/api/today
  const [today_data, setToday_Data] = useState(null);

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response = await fetch('https://martinco.pythonanywhere.com/api/week');
        const json = await response.json();
        setToday_Data(json);
      }
      catch(error){
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    //define fetchData - create the function
    //then call it to use within the useEffect hook
  },[])

  //https://martinco.pythonanywhere.com/api/today_list_order
  const [list_data, setList_Data] = useState(null);

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response = await fetch('https://martinco.pythonanywhere.com/api/today_list_order');
        const json = await response.json();
        setList_Data(json);
      }
      catch(error){
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    //define fetchData - create the function
    //then call it to use within the useEffect hook
  },[])

  const filterdata = (keyword) => {
    if (!list_data) return null;

    const filteredData ={};
    for (const [key, value] of Object.entries(list_data)) {
      if (key.includes(keyword)){
        filterdata[key] = value;
      }
    }
    return filteredData;
  }

  const [requestor, setRequestor] = useState();

    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/mongoDB/requestor_total_orders', setRequestor);
    },[])

  if (requestor === null) {
      return <div>Loading...</div>
  }


  return (
    <section className='report'>
        <section className="report-section">
            <h1 className="title">
                Report Name
            </h1>
            <div className="analysis-section">
                <div className="stat-div">
                  {today_data ? (
                    <ul className ="stat-list">
                      {Object.entries(today_data).map(([key,value]) => (
                        
                        <li key={key} className="stat-li">
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
              <div className="area two">
                <h3 className="card-title">Requestors of the week</h3>                
                
                <table>
                    <thead>
                        <tr>
                            <th>Requestor</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    {requestor ? (
                    <tbody>
                      {Object.entries(requestor).map(([key,value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                      ))}
                       
                    </tbody>
                  ) : 
                    (
                      <p>Loading...</p>
                    )
                  } 
                    
                </table>
                
                
                
            </div>  
            
        </section>
        
    </section>
  )
}

export default Week;
