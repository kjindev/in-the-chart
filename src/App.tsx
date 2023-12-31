import BarChart from "./lib/chart/BarChart";
import LineChart from "./lib/chart/LineChart";
import React from "react";

function App() {
  const data = [
    {
      x: [0, 20, 40, 60, 80],
      y: [20, 30, 50, 20, 50],
      lineColor: "green",
      pointColor: "green",
      pointSize: "3",
      areaColor: "green",
    },
  ];

  const barData = [
    {
      x: [20, 40, 60, 80, 100],
      y: [30, 50, 20, 10, 30],
      color: "green",
      borderColor: "green",
      size: "30",
    },
  ];

  const label = {
    x: {
      display: true,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    y: {
      display: true,
      max: 100,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    title: {
      text: "차트 제목",
      // fontSize: "20px",
      // align: "end",
    },
  };

  const option = {
    backgroundColor: "white",
    borderRadius: "16px",
  };

  return (
    <>
      <LineChart
        width={500}
        height={400}
        data={data}
        label={label}
        option={option}
      />
    </>
  );
}

export default App;
