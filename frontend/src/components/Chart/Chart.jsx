import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";


export const data1 = [
    ["Brands", "Cars"],
    ["Bmw", 500],
    ["Benz", 400],
  ];
  
  function getRandomNumber() {
    return Math.random() * 100;
  }
  
  export function getData() {
    return [
      // ["Label", "Value"],
      // ["Speed", getRandomNumber()],
      // ["Fuel", getRandomNumber()],
      // ["Battery", getRandomNumber()],
    ];
  }
  
  export const options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };
  

function ChartJS() {
    const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });
  return (
    <div style={{marginTop:50,marginLeft:100}} >      
    <Box sx={{marginLeft:60}} >
    <Chart
      chartType="Gauge"
      width="100%"
      height="180px"
      data={data}
      options={options}
    />
    </Box>


 <Chart
      chartType="Bar"
      width="90%"
      height="400px"
      data={data1}
    />
    </div>
  )
}

export default ChartJS