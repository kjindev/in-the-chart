import { useEffect, useState } from "react";
import { DataProps } from "../types";
import Title from "../components/Title";

const BarChart = ({ width, height, data, label, option }: DataProps) => {
  const [dataList, setDataList] = useState([]);

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
      text: label.y.fontSize ? Number(label.y.fontSize.slice(0, -2)) - 8 : 7,
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

      let dataRangeTest = data.map((item) =>
        item.y.filter((element) => element < 0)
      );

      let dataRangeTestResult = dataRangeTest.map((item) => item.length > 0);

      let yRangeTemp = {
        min: label.y.min !== undefined ? label.y.min : 0,
        max: label.y.max !== undefined ? label.y.max : Math.max(...yMaxTemp),
      };

      if (dataRangeTestResult.includes(true)) {
        yRangeTemp = {
          min: label.y.min !== undefined ? label.y.min : Math.min(...yMinTemp),
          max: label.y.max !== undefined ? label.y.max : Math.max(...yMaxTemp),
        };
      }

      setXrange(xRangeTemp);
      setYrange(yRangeTemp);
    }
  }, [data]);

  useEffect(() => {
    if (xRange && yRange) {
      const xStep = label.x.step
        ? label.x.step
        : Math.ceil((xRange.max - xRange.min) / data[0].x.length);
      const yStep = label.y.step
        ? label.y.step
        : Math.ceil((yRange.max - yRange.min) / data[0].y.length);

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
    let temp: any = [];
    let temp2: any = [];
    for (let i = 0; i < data.length; i++) {
      temp = [];
      for (let j = 0; j < data[i].x.length; j++) {
        temp.push({ x: data[i].x[j], y: data[i].y[j] });
      }
      temp2.push(temp);
    }
    setDataList(temp2);
  }, [xAxis, yAxis]);

  return (
    <div
      style={{
        width: width,
        backgroundColor: option?.backgroundColor,
        borderRadius: option?.borderRadius,
      }}
    >
      {label.title && (
        <Title
          width={width}
          titleHeight={titleHeight}
          chartMarginX={chartMargin.x.text}
          option={label.title}
        />
      )}
      <div
        style={{
          backgroundColor: option?.backgroundColor,
          width: svgWidth,
          height: svgHeight,
          borderRadius: option?.borderRadius,
        }}
      >
        <svg width={svgWidth} height={svgHeight}>
          {/* {dataList.length !== 0 &&
            dataList.map((element: any) => {
              item.map((item, index) => 
              
            {  const xPosition =
              chartMargin.x.body +
              index * (chartWidth / xAxis.numOfGrid) +
              15;
            const yPosition =
              item.y >= 0
                ? chartMargin.y.body +
                  (yRange.max - 0) * yAxis.scale -
                  item.y * yAxis.scale
                : chartMargin.y.body + (yRange.max - 0) * yAxis.scale;
            // - (0 - yRange.min) * yAxis.scale
            return (
              <rect
                key={index}
                x={xPosition}
                y={yPosition}
                width="30"
                height={
                  item.y >= 0 ? item.y * yAxis.scale : -item.y * yAxis.scale
                }
              />
            )}
              )
            
            })} */}
          {dataList.length !== 0 &&
            dataList.map((element: any, i: number) => {
              return element.map((item: any, index: number) => {
                const xPosition =
                  chartMargin.x.body +
                  index * (chartWidth / xAxis.numOfGrid) +
                  15;
                const yPosition =
                  item.y >= 0
                    ? chartMargin.y.body +
                      (yRange.max - 0) * yAxis.scale -
                      item.y * yAxis.scale
                    : chartMargin.y.body + (yRange.max - 0) * yAxis.scale;

                return (
                  <rect
                    key={index}
                    x={xPosition}
                    y={yPosition}
                    width="30"
                    height={
                      item.y >= 0 ? item.y * yAxis.scale : -item.y * yAxis.scale
                    }
                    fill={i === 1 ? "blue" : "green"}
                  />
                );
              });
            })}
          <svg>
            {/* X Axis Grid */}
            {xAxis.numOfGrid !== 0 &&
              label.x.grid &&
              Array.from({ length: Math.floor(xAxis.numOfGrid) - 1 }).map(
                (_, index) => {
                  const xPosition =
                    chartMargin.x.body +
                    (index + 1) * (chartWidth / xAxis.numOfGrid);
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
            {/* {xAxis.numOfGrid !== 0 &&
              label.x.display &&
              Array.from({ length: Math.ceil(xAxis.numOfGrid) }).map(
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
              )} */}
            {dataList.map((item: any, index: number) => {
              const xPosition =
                chartMargin.x.body +
                index * (chartWidth / xAxis.numOfGrid) +
                chartWidth / xAxis.numOfGrid / 2;

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
                  {item.x}
                </text>
              );
            })}
            {/* Y Axis Grid */}
            {yAxis.numOfGrid &&
              label.y.grid &&
              Array.from({ length: Math.ceil(yAxis.numOfGrid) }).map(
                (_, index) => {
                  const xPosition = chartMargin.x.body;
                  const yPosition =
                    chartMargin.y.body +
                    index * (chartHeight / yAxis.numOfGrid);
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
            {/* Y Axis Label */}
            {yAxis.numOfGrid &&
              label.y.display &&
              Array.from({ length: Math.ceil(yAxis.numOfGrid) + 1 }).map(
                (_, index) => {
                  const xPosition = chartMargin.x.body - chartMargin.y.text;
                  // const yPosition =
                  //   chartMargin.y.body + index * (chartHeight / yAxis.numOfGrid);
                  const yPosition =
                    chartMargin.y.body +
                    index * (chartHeight / yAxis.numOfGrid);

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
        </svg>
      </div>
    </div>
  );
};
export default BarChart;
