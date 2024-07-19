import React from "react";
import Plot from 'react-plotly.js';

function Gadget({min, middle_1, middle_2, max}){
    return (
        <Plot className='data-delivery'
                
            data={[
                {
                type: "indicator",
                mode: "gauge+number+delta",
                value: middle_1,
                title: { text: "Speed", font: { size: 12 } },
                
                gauge: {
                    axis: { range: [min, max], tickwidth: 2, tickcolor: "darkblue" },
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
    )
}


export default Gadget;

//delta: { reference: -20, increasing: { color: "RebeccaPurple" } }, 