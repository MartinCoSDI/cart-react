import React from "react";
import Plot from 'react-plotly.js';

//https://plotly.com/javascript/pie-charts/

function Pie({value, label, width, height}){
    return (
        <Plot className='data-delivery'
        data={[
          {
            values: value,
            labels: label,
            type: 'pie',
            //textinfo: "label+percent",
            //textposition: "outside",
            //automargin: true
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
          }
        ]}
        layout={ {width: width, height: height,
           paper_bgcolor:'rgba(0,0,0,0)',
           plot_bgcolor:'rgba(0,0,0,0)',
           showlegend: false
          } }      />
    )
}


export default Pie;

