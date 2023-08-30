import Axis from "./Components/Axis";
import LineChart from "./Chart/LineChart";

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

  const label = {
    x: {
      display: true,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    y: {
      display: true,
      min: 0,
      max: 80,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    // title: {
    //   text: "차트 제목...",
    //   fontSize: "20px",
    //   align: "center",
    // },
  };

  const option = {
    backgroundColor: "white",
    borderRadius: "16px",
  };

  return (
    <>
      <LineChart
        width={300}
        height={400}
        data={data}
        label={label}
        option={option}
      />
      {/* <BarChart
        width={350}
        height={350}
        data={data}
        label={label}
        option={option}
      /> */}
    </>
  );
}

export default App;
