import React from "react";
import Plot from 'react-plotly.js';

function Bar_Single({xaxis,yaxis, xname, yname, barname1, name, width, height}){
    return (
        <Plot className='data-delivery'
        data={[
          {
            type: 'bar',
            x: xaxis,
            y: yaxis,
            name: barname1
          }
        ]}
        layout={ {width: width, height: height, title: name,
        xaxis: {
            title: xname
         },yaxis: {
            title: yname,
            automargin: true
         },
         paper_bgcolor:'rgba(0,0,0,0)',
         plot_bgcolor:'rgba(0,0,0,0)'
        } }
      />
    )
}


export default Bar_Single;