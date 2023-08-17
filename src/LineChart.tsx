import { useState } from "react";
import { DataProps, DataType } from "./types";

const LineChart = ({ width, height, data, label, style }: DataProps) => {
  /*  const [svgSize, setSvgSize] = useState({
    width: width,
    height: height,
  });
  const [chartSize, setChartSize] = useState({
    width: svgSize.width * 0.8,
    height: svgSize.height * 0.8,
  });

  const [values, setValues] = useState({
    x: data.map((item: DataType) => item.x),
    y: data.map((item: DataType) => item.y),
  });

  const [range, setRange] = useState({
    x: {
      min: label.x.min === undefined ? Math.min(...values.x) : label.x.min,
      max: label.x.max === undefined ? Math.max(...values.x) : label.x.max,
    },
    y: {
      min: label.y.min === undefined ? Math.min(...values.y) : label.y.min,
      max: label.y.max === undefined ? Math.max(...values.y) : label.y.max,
    },
  });

  const [step, setStep] = useState({
    x: label.x.step || Math.floor(range.x.max / data.length - 1),
    y: label.y.step || Math.floor(range.y.max / data.length - 1),
  });

  const [numOfGridLines, setNumOfGridLines] = useState({
    x: (range.x.max - range.x.min) / step.x,
    y: (range.y.max - range.y.min) / step.y,
  });

  const [scale, setScale] = useState({
    x: chartSize.width / (range.x.max - range.x.min),
    y: chartSize.height / (range.y.max - range.y.min),
  });

  const [points, setPoints] = useState<any>((item: DataType) => ({
    x: (item.x - range.x.min) * scale.x + svgSize.width * 0.1 + 5,
    y:
      chartSize.height -
      (item.y - range.y.min) * scale.y +
      svgSize.height * 0.1,
  }));
*/

  /* const svgWidth = width;
  const svgHeight = height;
  const chartWidth = svgWidth * 0.8;
  const chartHeight = svgHeight * 0.8; */

  const [svgWidth, setWidth] = useState(width);
  const [svgHeight, setHeight] = useState(height);
  const [chartWidth, setChartWidth] = useState(svgWidth * 0.8);
  const [chartHeight, setChartHeight] = useState(svgHeight * 0.8);

  const xValues = data.map((item: DataType) => item.x);
  const yValues = data.map((item: DataType) => item.y);
  const xMin = label.x.min === undefined ? Math.min(...xValues) : label.x.min;
  const xMax = label.x.max === undefined ? Math.max(...xValues) : label.x.max;
  const xStep = label.x.step || Math.floor(xMax / data.length - 1);
  const yMin = label.y.min === undefined ? Math.min(...yValues) : label.y.min;
  const yMax = label.y.max === undefined ? Math.max(...yValues) : label.y.max;
  const yStep = label.y.step || Math.floor(yMax / data.length - 1);
  const numOfXGridLines = (xMax - xMin) / xStep;
  const numOfYGridLines = (yMax - yMin) / yStep;

  const xScale = chartWidth / (xMax - xMin);
  const yScale = chartHeight / (yMax - yMin);

  const points = data.map((item: DataType) => ({
    x: (item.x - xMin) * xScale + svgWidth * 0.1 + 5,
    y: chartHeight - (item.y - yMin) * yScale + svgHeight * 0.1,
  }));

  const pathData = points
    .map((point: DataType) => `${point.x},${point.y}`)
    .join(" ");

  const areaPoints = [
    ...points,
    {
      x: points[points.length - 1].x,
      y: chartHeight + svgHeight * 0.1,
    },
    { x: points[0].x, y: chartHeight + svgHeight * 0.1 },
  ];

  const areaPathData = areaPoints
    .map((point: DataType) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: style.backgroundColor,
        width: svgWidth,
        height: svgHeight,
      }}
    >
      <svg width={svgWidth} height={svgHeight}>
        {/*gradient*/}
        {style.areaGradient && (
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="90%">
              <stop offset="0%" stopColor={style.areaGradient[0]} />
              <stop offset="100%" stopColor={style.areaGradient[1]} />
            </linearGradient>
          </defs>
        )}
        <polygon
          points={areaPathData}
          fill={style.areaColor || "url(#areaGradient)" || "none"}
        />
        <g height={chartHeight}>
          <polyline
            points={pathData}
            fill="none"
            stroke={style.lineColor}
            strokeWidth="2"
          />
          {points.map((point: DataType, index: number) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={style.pointSize}
              fill={style.pointColor}
            />
          ))}
        </g>
        {/*<line
        x1="10"
        y1={chartHeight + 10}
        x2={chartWidth + 10}
        y2={chartHeight + 10}
        stroke="black"
      />
  <line x1="10" y1="10" x2="10" y2={chartHeight + 10} stroke="black" />*/}
        <svg width={svgWidth} height={svgHeight}>
          {/* X Axis Grid */}
          {Array.from({ length: Math.ceil(numOfXGridLines) + 1 }).map(
            (_, index) => {
              const xPosition =
                svgWidth * 0.1 + 5 + index * (chartWidth / numOfXGridLines);
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
            Array.from({ length: numOfXGridLines + 1 }).map((_, index) => {
              const xPosition =
                svgWidth * 0.1 + 5 + index * (chartWidth / numOfXGridLines);
              const yPosition = chartHeight + svgHeight * 0.1 + 20;
              return (
                <text
                  key={index}
                  x={xPosition}
                  y={yPosition}
                  textAnchor="middle"
                  style={{ fontSize: label.x.fontSize }}
                >
                  {Math.floor(xMin + xStep * index)}
                </text>
              );
            })}
        </svg>
        <svg height={svgHeight}>
          {/* Y Axis Grid */}
          {Array.from({ length: Math.ceil(numOfYGridLines) }).map(
            (_, index) => {
              const xPosition = svgWidth * 0.1 + 5;
              const yPosition =
                svgHeight * 0.1 + index * (chartHeight / numOfYGridLines);
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
            }
          )}
        </svg>
        <svg height={svgHeight * 0.95}>
          {/* Y Axis Label */}
          {label.y.display &&
            Array.from({ length: Math.ceil(numOfYGridLines + 1) }).map(
              (_, index) => {
                const xPosition = svgWidth * 0.1 - 3;
                const yPosition =
                  svgHeight * 0.1 + index * (chartHeight / numOfYGridLines);

                return (
                  <text
                    key={index}
                    x={xPosition}
                    y={yPosition}
                    textAnchor="end"
                    alignmentBaseline="middle"
                    style={{ fontSize: label.y.fontSize }}
                  >
                    {yMax - yStep * index < yMin ? "" : yMax - yStep * index}
                  </text>
                );
              }
            )}
        </svg>
      </svg>
    </div>
  );
};

export default LineChart;
