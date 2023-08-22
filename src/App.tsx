import LineChart from "./LineChart";

function App() {
  const data = [
    {
      x: [0, 20, 40, 60, 80],
      y: [70, 60, 50, 20, 50],
      lineColor: "green",
      pointColor: "green",
      pointSize: "3",
      //  areaColor: "green",
    },
    {
      x: [0, 20, 40, 60, 80],
      y: [30, 70, 20, 70, 30],
      lineColor: "blue",
      pointColor: "blue",
      pointSize: "3",
      // areaColor: "blue",
    },
  ];

  const label = {
    x: {
      display: true,
      step: 20,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "13px",
      grid: true,
    },
    y: {
      display: true,
      min: 10,
      max: 90,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "13px",
      grid: true,
    },
    title: {
      text: "chart title",
      fontSize: "18px",
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
        height={500}
        data={data}
        label={label}
        option={option}
      />
    </>
  );
}

export default App;
