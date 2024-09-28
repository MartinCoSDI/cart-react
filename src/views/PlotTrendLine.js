import React, { useEffect, useReducer, useState } from "react";
import Plot from 'react-plotly.js';
import { useStateValue } from "../StateProvider";
import reducer_s from "../reducer";

function Trendline({xaxis,yaxis,xname, yname, name, width, height}){
  const [temp1, setTemp1] = useState(null);
  const [control1, setControl1] = useState(false);
  const default_color = 'rgba(255,0,0,0.3)'
  const highlight_color = 'rgba(255,0,255,1)'
  
  const [default_text, setDefault_text] = useState(new Array(yaxis ? yaxis.length : null).fill(false))

  //test

  //
  const [colors, setColors] = useState(new Array(yaxis ? yaxis.length : null).fill(default_color))

  const handleGraph1click = (e) => {
    //e.preventDefault();
    const category = e.points[0].x;

    //const color_index = e.points[0].pointIndex;
    const newColor = new Array(yaxis ? yaxis.length : null).fill(default_color)
    const newText = new Array(yaxis ? yaxis.length : null).fill(false)

    if (category !== null)
      {
        newColor[category-1] = highlight_color;
        newText[category-1] = true;
        setDefault_text(newText)
        setColors(newColor);
        setTemp1(category);
        setControl1(true);
        
      }
    else
      {
        setTemp1(null);
        setControl1(true);
      }
    }

  const [{user, cond_test, user_email, user_color, user_point_text, test}, dispatch] = useStateValue();

  useEffect(() => {
    if (control1 !== false){
      console.log('point', user_point_text)
      if (temp1 !== test){
        
        dispatch({
          type: "SET_COLOR",
          user: colors
          });
        dispatch({
          type: "SET_POINT_TEXT",
          user: default_text
          });
        dispatch({
          type: "SET_TEST",
          user: temp1
          });
      }
      else {
        const keepColor = new Array(yaxis ? yaxis.length : null).fill(default_color)
        const keepText = new Array(yaxis ? yaxis.length : null).fill('')

        dispatch({
          type: "SET_COLOR",
          user: keepColor
          });
        dispatch({
          type: "SET_POINT_TEXT",
          user: keepText
         });
        dispatch({
          type: "SET_TEST",
          user: null
          });
      }
      setControl1(false)
    }

  }, [control1])

  let modifiedtext = new Array(yaxis ? yaxis.length : null).fill('')

  if (user_point_text !== null){
    modifiedtext = yaxis.map((y, index) => user_point_text[index] ? y : '')
  }

  return (
        <Plot className='data-delivery'
        data={[
          {
            //x: temp1 ? [temp1] : xaxis,
            //y: temp1 ? [yaxis[temp1-1]] : yaxis,
            x: xaxis,
            y: yaxis,
            type: 'scatter',
            mode: 'lines+markers+text',
            text: modifiedtext,
            //textposition: 'right bottom',
            marker: {color: user_color ? user_color : default_color},
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
         plot_bgcolor:'rgba(0,0,0,0)',
         color: colors //making the transparent color
        } }

        onClick={handleGraph1click}
      />
    )
}

export default Trendline;