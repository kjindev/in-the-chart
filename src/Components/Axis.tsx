import { useEffect, useState } from "react";
import { DataProps } from "../types";

const Axis = ({ width, height, data, label }: DataProps) => {
  const svgWidth = width;
  const titlePadding = label.title?.fontSize
    ? Number(label.title.fontSize.slice(0, -2)) * 1.2
    : 16 * 0.6;
  const titleHeight = label.title ? height * 0.07 + titlePadding : 0;
  const svgHeight = height - titleHeight;

  const chartMargin = {
    x: {
      body: label.y.fontSize
        ? Number(label.y.fontSize.slice(0, -2)) + 25
        : 12 * 3,
      text: label.x.fontSize ? Number(label.x.fontSize.slice(0, -2)) + 5 : 20,
    },
    y: {
      title: label.title?.fontSize
        ? Number(label.title.fontSize.slice(0, -2))
        : 12 * 3,
      body: label.x.fontSize
        ? Number(label.x.fontSize.slice(0, -2)) + 12
        : 12 * 3,
      text: label.y.fontSize ? Number(label.y.fontSize.slice(0, -2)) - 5 : 7,
    },
  };

  const chartWidth = svgWidth - chartMargin.x.body * 1.7;
  const chartHeight = svgHeight - chartMargin.y.body * 2 - 7;

  const [xRange, setXrange] = useState<{ min: number; max: number }>({
    min: 1,
    max: 2,
  });
  const [yRange, setYrange] = useState<{ min: number; max: number }>({
    min: 1,
    max: 2,
  });

  const [xAxis, setXAxis] = useState({
    step: 5,
    numOfGrid: 5,
    scale: 1,
  });

  const [yAxis, setYAxis] = useState({
    step: 5,
    numOfGrid: 5,
    scale: 1,
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
        min: label.x.min !== undefined ? label.x.min : Math.min(...xMinTemp),
        max: label.x.max !== undefined ? label.x.max : Math.max(...xMaxTemp),
      };

      let yRangeTemp = {
        min: label.y.min !== undefined ? label.y.min : Math.min(...yMinTemp),
        max: label.y.max !== undefined ? label.y.max : Math.max(...yMaxTemp),
      };

      setXrange(xRangeTemp);
      setYrange(yRangeTemp);
    }
  }, [data]);

  useEffect(() => {
    if (xRange && yRange) {
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

  return (
    <svg width={svgWidth} height={svgHeight}>
      {/* X Axis Grid */}
      {label.x.grid &&
        Array.from({ length: Math.floor(xAxis.numOfGrid) - 1 }).map(
          (_, index) => {
            const xPosition =
              chartMargin.x.body + (index + 1) * (chartWidth / xAxis.numOfGrid);
            const yPosition = chartMargin.y.body;
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
              chartMargin.x.body + index * (chartWidth / xAxis.numOfGrid);
            const yPosition =
              chartHeight + chartMargin.y.body + chartMargin.x.text;
            return (
              <text
                key={index}
                x={xPosition}
                y={yPosition}
                textAnchor="middle"
                style={{ fontSize: label.x.fontSize }}
              >
                {xRange.min + xAxis.step * index > xRange.max
                  ? ""
                  : xRange.min + xAxis.step * index}
              </text>
            );
          }
        )}
      {/* Y Axis Grid */}
      {label.y.grid &&
        Array.from({ length: Math.ceil(yAxis.numOfGrid) }).map((_, index) => {
          const xPosition = chartMargin.x.body;
          const yPosition =
            chartMargin.y.body + index * (chartHeight / yAxis.numOfGrid);
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
            const xPosition = chartMargin.x.body - chartMargin.y.text;
            const yPosition =
              chartMargin.y.body + index * (chartHeight / yAxis.numOfGrid);
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
      {/* X axis */}
      <line
        x1={chartMargin.x.body}
        y1={chartMargin.y.body + chartHeight}
        x2={chartWidth + chartMargin.x.body}
        y2={chartMargin.y.body + chartHeight}
        stroke={label.x.axisColor}
      />
      {/* Y axis */}
      <line
        x1={chartMargin.x.body}
        y1={chartMargin.y.body}
        x2={chartMargin.x.body}
        y2={chartHeight + chartMargin.y.body}
        stroke={label.y.axisColor}
      />
      {/* X2 axis */}
      {label.x.grid && (
        <line
          x1={chartMargin.x.body + chartWidth}
          y1={chartMargin.y.body}
          x2={chartMargin.x.body + chartWidth}
          y2={chartHeight + chartMargin.y.body}
          stroke={label.y.axisColor}
        />
      )}
    </svg>
  );
};
export default Axis;
