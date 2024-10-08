import React, { useEffect, useState } from "react";
import "./Flip_Card.css";
import Trendline from "./PlotTrendLine";

//function Trendline({xaxis,yaxis,xname, yname, name, width, height}){

function Flip_Card({title, linkz}) {
    const [token, setToken] = useState(null);

    useEffect(() => {
  
      const savedToken = localStorage.getItem('firebase-token');
      console.log(savedToken)
      setToken(savedToken);
      //console.log(savedCondition)
    
    })
  

    const [value, setValue] = useState(null);
    const fetchDatafunc  = async(url, dataset) => {
        try {
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                  
                  'Authorization': `Bearer ${token}`
                }
      
              });
            const jsonData = await response.json();
            dataset(jsonData);
        }
        catch(error){
            console.error('Erro fetching data:' , error);
        }
    };

    useEffect(() => {
        fetchDatafunc(linkz, setValue);
    },[])
  return (
    <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>{title}</h1>
                </div>
                <div class="flip-card-back">
                {value && 
                    (
                                    value[title] && 
                                    (
                                        <Trendline xaxis = {value[title].year} yaxis ={value[title].value} xname ='Year' yname = 'Value' name = {title}></Trendline>
                                    )
                    )
                }
                </div>
            </div>
    </div>
            
    
  )
}

export default Flip_Card;
