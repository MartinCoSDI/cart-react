import React from "react";
import Plot from 'react-plotly.js';

function Trendline({xaxis,yaxis,xname, yname, name, width, height}){
    return (
        <Plot className='data-delivery'
        data={[
          {
            x: xaxis,
            y: yaxis,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ {width: width, height: height, title: name,
          responsive: true,
        xaxis: {
            title: xname
         },yaxis: {
            title: yname
         },
         paper_bgcolor:'rgba(0,0,0,0)',
         plot_bgcolor:'rgba(0,0,0,0)' //making the transparent color
        } }
      />
    )
}


export default Trendline;