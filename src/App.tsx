import LineChart from "./LineChart";

function App() {
  const data = [
    {
      x: [0, 20, 40, 60, 80],
      y: [70, 20, 50, 20, 50],
      lineColor: "green",
      pointColor: "green",
      pointSize: "3",
      areaColor: "green",
    },
    {
      x: [0, 20, 40, 60, 80],
      y: [10, 30, 100, 10, 0],
      lineColor: "blue",
      pointColor: "blue",
      pointSize: "3",
      areaColor: "blue",
    },
  ];

  const label = {
    x: {
      display: true,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "13px",
    },
    y: {
      display: true,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "12px",
    },
  };

  const option = {
    backgroundColor: "white",
  };

  return (
    <LineChart
      width={500}
      height={500}
      data={data}
      label={label}
      option={option}
    />
  );
}

export default App;
