import BarChart from "./Chart/BarChart";
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

  const barData = [
    {
      x: [20, 40, 60, 80, 100],
      y: [30, 50, 20, 50, 80],
      color: "green",
      borderColor: "green",
      size: "30",
    },
  ];

  const label = {
    x: {
      display: true,
      // min: 0,
      // max: 100,
      // step: 20,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    y: {
      display: true,
      min: 0,
      // max: 80,
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
      {/* <LineChartTemp
        width={500}
        height={400}
        data={data}
        label={label}
        option={option}
      /> */}
      <BarChart
        width={350}
        height={350}
        data={barData}
        label={label}
        option={option}
      />
    </>
  );
}

export default App;
