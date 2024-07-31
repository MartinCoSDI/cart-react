import React from "react";
import Plot from 'react-plotly.js';

function Bar({xaxis,yaxis,yaxis2 , xname, yname, barname1, barname2, name}){
    return (
        <Plot className='data-delivery'
        data={[
          {
            type: 'bar',
            x: xaxis,
            y: yaxis,
            name: barname1
          },
          
          {
            type: 'bar',
            x: xaxis,
            y: yaxis2,
            name: barname2
          }
        ]}
        layout={ {width: 1000, height: 480, title: name,
        xaxis: {
            title: xname
         },yaxis: {
            title: yname,
            automargin: true
         },
         margin:{
          l: 350
         }
        } }
      />
    )
}


export default Bar;