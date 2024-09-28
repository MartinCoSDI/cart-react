import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

function TrendlineBar({xaxis,yaxis, ybar,xname, yname, name, width, height}){
  
  const [temp, setTemp] = useState();
  const [control, setControl] = useState(false);
  
  const handleGraph1click = (e) => {

    const category = e.points[0].x;
    
    setTemp(category);
    setControl(true);} 

  useEffect(() => {
    if (control !== false){
        console.log(temp, 'this is from component')
        setControl(false)
    }

  }, [control])
  
  return (
        <Plot className='data-delivery'
        data={[
          {
            x: xaxis,
            y: yaxis,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: 'Orders'
          },
          
          {type:'bar', x:xaxis , y: ybar, yaxis: 'y2', name:'Value'}
        ]}
        layout={ {width: width, height: height, title: name,
          
        legend : {
          orientation: 'h',
          x: 0.2,
          y: 1.3
        },
        xaxis: {
            title: xname
         },yaxis: {
            title: yname
         },
            yaxis: {title: yname},
            yaxis2: {
                title: 'yaxis2 title',
                titlefont: {color: 'rgb(148, 103, 189)'},
                tickfont: {color: 'rgb(148, 103, 189)'},
                overlaying: 'y',
                side: 'right'
          },
          paper_bgcolor:'rgba(0,0,0,0)',
                plot_bgcolor:'rgba(0,0,0,0)'

        } }

        onClick={handleGraph1click}
      />
    )
}


export default TrendlineBar;