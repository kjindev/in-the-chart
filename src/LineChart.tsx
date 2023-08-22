import { useEffect, useState } from "react";
import { DataProps, XYType, DatasetType } from "./types";

const LineChart = ({ width, height, data, label, option }: DataProps) => {
  const svgWidth = width;
  const svgHeight = height;
  const chartWidth = svgWidth * 0.8;
  const chartHeight = svgHeight * 0.8;

  const [dataset, setDataset] = useState<DatasetType[]>([]);

  const [xRange, setXrange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [yRange, setYrange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  const [xAxis, setXAxis] = useState({
    step: 5,
    numOfGrid: 5,
    scale: 0,
  });

  const [yAxis, setYAxis] = useState({
    step: 5,
    numOfGrid: 5,
    scale: 0,
  });

  useEffect(() => {
    let xMinTemp: number[] = new Array(data.length).fill(0);
    let xMaxTemp: number[] = new Array(data.length).fill(0);
    let yMinTemp: number[] = new Array(data.length).fill(0);
    let yMaxTemp: number[] = new Array(data.length).fill(0);

    if (data) {
      for (let i = 0; i < data.length; i++) {
        xMinTemp[i] = Math.min(...data[i].x);
        xMaxTemp[i] = Math.max(...data[i].x);
        yMinTemp[i] = Math.min(...data[i].y);
        yMaxTemp[i] = Math.max(...data[i].y);
      }

      let xRangeTemp = {
        min: label.x.min || Math.min(...xMinTemp),
        max: label.x.max || Math.max(...xMaxTemp),
      };

      let yRangeTemp = {
        min: label.y.min || Math.min(...yMinTemp),
        max: label.y.max || Math.max(...yMaxTemp),
      };

      setXrange(xRangeTemp);
      setYrange(yRangeTemp);
    }
  }, [data]);

  useEffect(() => {
    if (yRange) {
      const xStep =
        label.x.step ||
        Math.floor((xRange.max - xRange.min) / data[0].x.length);
      const yStep =
        label.y.step ||
        Math.floor((yRange.max - yRange.min) / data[0].y.length);

      let xAxisTemp = {
        step: xStep,
        numOfGrid: (xRange.max - xRange.min) / xStep,
        scale: chartWidth / (xRange.max - xRange.min),
      };

      let yAxisTemp = {
        step: yStep,
        numOfGrid: (yRange.max - yRange.min) / yStep,
        scale: chartHeight / (yRange.max - yRange.min),
      };

      setXAxis(xAxisTemp);
      setYAxis(yAxisTemp);
    }
  }, [xRange, yRange]);

  useEffect(() => {
    let points: XYType[][] = [];
    let pointsPath: string | string[] = [];
    let areaPoints: XYType[][] = [];
    let areaPath: string | string[] = [];

    if (points.length < data.length) {
      let temp1: XYType[][] = [];
      for (let i = 0; i < data.length; i++) {
        let temp2: XYType[] = [];
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
          points[i].map((point: XYType) => `${point.x},${point.y}`).join(" ")
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
            .map((point: XYType) => `${point.x},${point.y}`)
            .join(" ")
        );
      }

      let datasetTemp: DatasetType[] = [];

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

      setDataset(datasetTemp);
    }
  }, [xAxis, yAxis]);

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
        <g height={chartHeight}>
          {dataset.map((item: DatasetType, index: number) => (
            <>
              <polyline
                points={item.pointsPath}
                fill="none"
                stroke={item.lineColor}
                strokeWidth="2"
              />
              {item.areaColor && (
                <polygon
                  points={item.areaPath}
                  fill={item.areaColor}
                  opacity={0.2}
                />
              )}
              {item.points.map((point: XYType, index: number) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={item.pointSize}
                  fill={item.pointColor}
                />
              ))}
            </>
          ))}
        </g>
        <line
          x1={svgWidth * 0.1 + 5}
          y1={svgHeight * 0.1 + chartHeight}
          x2={chartWidth + svgWidth * 0.1 + 5}
          y2={svgHeight * 0.1 + chartHeight}
          stroke={label.x.axisColor}
        />
        <line
          x1={svgWidth * 0.1 + 5}
          y1={svgHeight * 0.1}
          x2={svgWidth * 0.1 + 5}
          y2={chartHeight + svgHeight * 0.1}
          stroke={label.y.axisColor}
        />
        <line
          x1={svgWidth * 0.1 + chartWidth + 5}
          y1={svgHeight * 0.1}
          x2={svgWidth * 0.1 + chartWidth + 5}
          y2={chartHeight + svgHeight * 0.1}
          stroke={label.y.axisColor}
        />
        {/* X Axis Grid */}
        {Array.from({ length: Math.floor(xAxis.numOfGrid) - 1 }).map(
          (_, index) => {
            const xPosition =
              svgWidth * 0.1 + 5 + (index + 1) * (chartWidth / xAxis.numOfGrid);
            const yPosition = svgHeight * 0.1;
            return (
              <line
                key={index}
                x1={xPosition}
                y1={yPosition}
                x2={xPosition}
                y2={yPosition + chartHeight}
                stroke={label.x.axisColor}
              />
            );
          }
        )}
        {/* X Axis Label */}
        {label.x.display &&
          Array.from({ length: Math.ceil(xAxis.numOfGrid) + 1 }).map(
            (_, index) => {
              const xPosition =
                svgWidth * 0.1 + 5 + index * (chartWidth / xAxis.numOfGrid);
              const yPosition = chartHeight + svgHeight * 0.1 + 20;
              return (
                <text
                  key={index}
                  x={xPosition}
                  y={yPosition}
                  textAnchor="middle"
                  style={{ fontSize: label.x.fontSize }}
                >
                  {/* {Math.floor(xRange.min + xAxis.step * index)} */}
                  {xRange.min + xAxis.step * index > xRange.max
                    ? ""
                    : xRange.min + xAxis.step * index}
                </text>
              );
            }
          )}
        {/* Y Axis Grid */}
        {Array.from({ length: Math.ceil(yAxis.numOfGrid) }).map((_, index) => {
          const xPosition = svgWidth * 0.1 + 5;
          const yPosition =
            svgHeight * 0.1 + index * (chartHeight / yAxis.numOfGrid);
          return (
            <line
              key={index}
              x1={xPosition}
              y1={yPosition}
              x2={xPosition + chartWidth}
              y2={yPosition}
              stroke={label.y.axisColor}
            />
          );
        })}
        {/* Y Axis Label */}
        {label.y.display &&
          Array.from({ length: Math.ceil(yAxis.numOfGrid) + 1 }).map(
            (_, index) => {
              const xPosition = svgWidth * 0.1 - 3;
              const yPosition =
                svgHeight * 0.1 + index * (chartHeight / yAxis.numOfGrid);

              return (
                <text
                  key={index}
                  x={xPosition}
                  y={yPosition}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  style={{ fontSize: label.y.fontSize }}
                >
                  {yRange.max - yAxis.step * index < yRange.min
                    ? ""
                    : yRange.max - yAxis.step * index}
                </text>
              );
            }
          )}
      </svg>
    </div>
  );
};
export default LineChart;
