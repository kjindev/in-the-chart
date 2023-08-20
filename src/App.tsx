import LineChart from "./LineChart";

function App() {
  const data = [
    {
      x: [0, 20, 40, 60, 80],
      y: [20, 30, 50, 50, -20],
      lineColor: "green",
      pointColor: "green",
      pointSize: "3",
      areaColor: "rgb(130, 190, 150, 0.5)",
    },
    {
      x: [0, 20, 40, 60, 80],
      y: [90, 50, 200, 10, -20],
      lineColor: "blue",
      pointColor: "blue",
      pointSize: "3",
      areaColor: "rgb(130, 190, 150, 0.5)",
    },
  ];

  const label = {
    x: {
      display: true,
      step: 20,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "12px",
    },
    y: {
      display: true,
      //min: -130,
      // max: 80,
      step: 15,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "12px",
    },
  };

  const option = {
    backgroundColor: "white",
  };

  return (
    <LineChart
      width={400}
      height={300}
      data={data}
      label={label}
      option={option}
    />
  );
}

export default App;
