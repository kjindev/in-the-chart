import { useEffect, useState } from "react";
import { DataProps, DataType } from "./types";

const LineChart = ({ width, height, data, label, option }: any) => {
  const svgWidth = width;
  const svgHeight = height;
  const chartWidth = svgWidth * 0.8;
  const chartHeight = svgHeight * 0.8;

  const [dataset, SetDataset] = useState<any>([]);

  useEffect(() => {
    let xRange = {
      min: 0,
      max: 0,
    };

    let yRange = {
      min: 0,
      max: 0,
    };

    let xAxis = {
      step: 5,
      numOfGrid: 5,
      scale: 0,
    };
    let yAxis = {
      step: 5,
      numOfGrid: 5,
      scale: 0,
    };

    let points: any = [];
    let pointsPath: any = [];
    let areaPoints: any = [];
    let areaPath: any = [];

    let xMinTemp: number[] = new Array(data.length).fill(0);
    let xMaxTemp: number[] = new Array(data.length).fill(0);
    let yMinTemp: number[] = new Array(data.length).fill(0);
    let yMaxTemp: number[] = new Array(data.length).fill(0);

    for (let i = 0; i < data.length; i++) {
      xMinTemp[i] = Math.min(...data[i].x);
      xMaxTemp[i] = Math.max(...data[i].x);
      yMinTemp[i] = Math.min(...data[i].y);
      yMaxTemp[i] = Math.max(...data[i].y);
    }

    xRange = {
      min: Math.min(...xMinTemp),
      max: Math.max(...xMaxTemp),
    };
    yRange = {
      min: Math.min(...yMinTemp),
      max: Math.max(...yMaxTemp),
    };

    const xStep = label.x.step || Math.floor(xRange.max / data.length - 1);
    const yStep = label.y.step || Math.floor(yRange.max / data.length - 1);

    xAxis = {
      step: xStep,
      numOfGrid: (yRange.max - yRange.min) / yStep,
      scale: chartWidth / (xRange.max - xRange.min),
    };
    yAxis = {
      step: yStep,
      numOfGrid: (xRange.max - xRange.min) / xStep,
      scale: chartHeight / (yRange.max - yRange.min),
    };

    if (points.length < data.length) {
      let temp1: any = [];
      for (let i = 0; i < data.length; i++) {
        let temp2 = [];
        for (let j = 0; j < data[i].x.length; j++) {
          let item = { x: 0, y: 0 };
          item = {
            x: (data[i].x[j] - xRange.min) * xAxis.scale + svgWidth * 0.1 + 5,
            y:
              chartHeight -
              (data[i].y[j] - yRange.min) * yAxis.scale +
              svgHeight * 0.1,
          };
          temp2.push(item);
        }
        temp1.push(temp2);
      }

      points = temp1;

      for (let i = 0; i < points.length; i++) {
        pointsPath.push(
          points[i].map((point: DataType) => `${point.x},${point.y}`).join(" ")
        );
        areaPoints.push([
          ...points[i],
          {
            x: points[i][points[i].length - 1].x,
            y: chartHeight + svgHeight * 0.1,
          },
          { x: points[i][0].x, y: chartHeight + svgHeight * 0.1 },
        ]);
      }

      for (let i = 0; i < areaPoints.length; i++) {
        areaPath.push(
          areaPoints[i]
            .map((point: DataType) => `${point.x},${point.y}`)
            .join(" ")
        );
      }
      let datasetTemp = [];
      for (let i = 0; i < data.length; i++) {
        datasetTemp.push({
          points: points[i],
          pointsPath: pointsPath[i],
          areaPoints: areaPoints[i],
          areaPath: areaPath[i],
          lineColor: data[i].lineColor,
          pointColor: data[i].pointColor,
          pointSize: data[i].pointSize,
          areaColor: data[i].areaColor,
        });
      }
      SetDataset(datasetTemp);
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: option.backgroundColor,
        width: svgWidth,
        height: svgHeight,
      }}
    >
      <svg width={svgWidth} height={svgHeight}>
        {dataset?.map((item: any, index: any) => (
          <>
            {/* <defs>
              <linearGradient
                id="areaGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="90%"
              >
                <stop offset="0%" stopColor={style.areaGradient[0]} />
                <stop offset="100%" stopColor={style.areaGradient[1]} />
              </linearGradient>
            </defs> */}
            {/* <polygon points={item.areaPath} fill="blue" /> */}
            <g height={chartHeight}>
              <polyline
                points={item.pointsPath}
                fill="none"
                stroke={item.lineColor}
                strokeWidth="2"
              />
              {item?.points?.map((point: DataType, index: number) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={item.pointSize}
                  fill={item.pointColor}
                />
              ))}
            </g>
          </>
        ))}
        {/*<line
            x1="10"
            y1={chartHeight + 10}
            x2={chartWidth + 10}
            y2={chartHeight + 10}
            stroke="black"
          />
      <line x1="10" y1="10" x2="10" y2={chartHeight + 10} stroke="black" />*/}
      </svg>
    </div>
  );

  //   return <div>hello</div>;
};
export default LineChart;
