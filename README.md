# in-the-chart

**in-the-chart** is a React library that allows you to easily create charts. It provides a line chart and a bar chart.

## install

```bash
npm install in-the-chart
```

## How to use

| Name   | Type   |          |
| ------ | ------ | -------- |
| width  | number | required |
| height | number | required |
| data   | object | required |
| label  | object | optional |
| option | object | optional |

### 1. Line Chart

```javascript
import { LineChart } from "in-the-chart";

function App() {
  const data = [
    {
      x: [0, 20, 40, 60, 80],
      y: [30, 70, 40, 50, 90],
      lineColor: "green",
      pointColor: "green",
      pointSize: "3",
      areaColor: "green",
    },
    {
      x: [0, 20, 40, 60, 80],
      y: [20, 30, 60, 30, 50],
      lineColor: "blue",
      pointColor: "blue",
      pointSize: "3",
      areaColor: "blue",
    },
  ];

  const label = {
    x: {
      display: true,
      min: 0,
      max: 80,
      step: 10,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    y: {
      display: true,
      min: 0,
      max: 100,
      step: 20,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    title: {
      text: "Chart Title",
      fontSize: "20px",
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
      height={400}
      data={data}
      label={label}
      option={option}
    />
  );
}

export default App;
```

### 2. Bar Chart (beta)

```javascript
import { BarChart } from "in-the-chart";

function App() {
  const data = [
    {
      x: [20, 40, 60, 80, 100],
      y: [30, 50, 20, 10, 30],
      color: "green",
      borderColor: "green",
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
      min: 0,
      max: 100,
      step: 20,
      axisColor: "rgb(0,0,0,0.1)",
      fontSize: "11px",
      grid: true,
    },
    title: {
      text: "Chart Title",
      fontSize: "20px",
      align: "center",
    },
  };

  const option = {
    backgroundColor: "white",
    borderRadius: "16px",
  };

  return (
    <BarChart
      width={500}
      height={400}
      data={data}
      label={label}
      option={option}
    />
  );
}

export default App;
```

Bar Chart supports only a single data, and the x-axis label is not displayed. It will be updated soon.
