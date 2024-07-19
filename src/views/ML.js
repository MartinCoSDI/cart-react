import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ML.css";

function ML() {

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

    const [data, setData] = useState();
    
    useEffect(() => {
          fetchDatafunc('http://127.0.0.1:5000/api/data_2025', setData);
    },[])
    

    //define data
    const [request1, setRequest] = useState('');
    const [result, setResult] = useState(0);

    
    const handleSubmit = async(event) => {
        event.preventDefault();

        //define the structure here
        const dat = {
            string1 : request1
        }

        //using fetch to pass data
        try {
            const response = await fetch('http://127.0.0.1:5000/api/handle', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dat)
            }        
        );

        //getting result from the API after passing the data
        const result = await response.json();
        if (result.status === 'success'){
            setResult(result.result);
        }
        else{
            alert ('Error');
        }

        }
        catch (error) {
            console.error('error', error);
            alert('Error submitting form');
        }
    }
  return (
    <section className="report">
        <div className="div-one">

            <div className="area two">
                <h3 className="card-title">Value and Quantity Trend Monthly</h3>
                
                <form onSubmit={handleSubmit}>
                    <p>Request:</p>
                    <input type='text' value = {request1} onChange={(e) => setRequest(e.target.value)}/>

                    <button type='submit'>submit</button>
                </form>
            </div>  

            <div className="area two">
            <p >
                Result
                {result !== null && 
                    (<span>{result}</span>)
                }
            </p> 
            </div>     

        </div>

    </section>
    
  )
}

export default ML;
