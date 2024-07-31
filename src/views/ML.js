import React, { useState } from "react";
import "./ML.css";

function ML() {

   
    

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
        //http://127.0.0.1:5000//api/handle

        //https://sdiinc.pythonanywhere.com/api/handle
        try {
            const response = await fetch('https://sdiinc.pythonanywhere.com/api/handle', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dat)
            }        
        );

        //getting result from the API after passing the data
        setRequest('')
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

    const [satisfy, setSatisfy] = useState('')

    function sati(event){
        setSatisfy(event.target.value)
    }

    let div1 = document.getElementById("zero");
    let div2 = document.getElementById("one");

    if (satisfy === 'No'){
        div1.classList.add("hidden");

        div2.classList.remove("hidden");

    }

    const [new_code, setNew_Code] = useState('')

    

    

    const handleAdjustment = async(event) => {
        event.preventDefault();
        //define the structure here
        const new_priority_code = {
            data1 : new_code
        }

        //using fetch to pass data
        //http://127.0.0.1:5000//api/handle_adjustment

        //https://sdiinc.pythonanywhere.com/api/handle_adjustment
        try {
            const response = await fetch('https://sdiinc.pythonanywhere.com/api/handle_adjustment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(new_priority_code)
            }        
        );

        //getting result from the API after passing the data
        const result = await response.json();
        if (result.status === 'success'){
            alert('New code is' + result)
        }
        else{
            alert ('Error');
        }

        }
        catch (error) {
            console.error('error', error);
            alert('Error submitting form');
        }
        setNew_Code(0)

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

            <div className="area two" id="zero">
                    <p>Do you satisfy with the prediction?</p>
                    <button value = 'Yes' onClick= {(e) => sati(e) }>Yes</button>
                    <button value = 'No' onClick= {(e) => sati(e)}>No</button>

            </div>  

            <div className="area two hidden" id="one">
            <form onSubmit={handleAdjustment}>
                    <p>Your priority code:</p>
                    <input type='text' value = {new_code} onChange={(e) => setNew_Code(e.target.value)}/>

                    <button type='submit'>submit</button>
                </form>
            </div>  
        </div>

    </section>
    
  )
}

export default ML;
