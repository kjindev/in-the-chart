import LineChart from "./LineChart";

function App() {
  const data = [
    {
      x: [0, 20, 40, 60, 80],
      y: [70, 60, 50, 20, 50],
      lineColor: "green",
      pointColor: "green",
      pointSize: "3",
      areaColor: "green",
    },
  ];

  const label = {
    x: {
      display: true,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "13px",
      grid: true,
    },
    y: {
      display: true,
      min: 0,
      max: 80,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "13px",
      grid: true,
    },
    title: {
      text: "Title",
      // fontSize: "20px",
      align: "center",
    },
  };

  const option = {
    backgroundColor: "white",
    borderRadius: "16px",
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
