import LineChart from "./LineChart";

function App() {
  const data = [
    { x: 0, y: 50 },
    { x: 20, y: 10 },
    { x: 40, y: 70 },
    { x: 60, y: 50 },
    { x: 80, y: -50 },
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

  const style = {
    backgroundColor: "white",
    lineColor: "green",
    pointColor: "green",
    pointSize: "3",
    areaColor: "rgb(130, 190, 150, 0.5)",
    //areaGradient: ["#22c55e", "white"],
  };
  return (
    <LineChart
      width={400}
      height={300}
      data={data}
      label={label}
      style={style}
    />
  );
}

export default App;
