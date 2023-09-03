import { useEffect, useState } from "react";
import { DataProps } from "../types";
import Title from "../Components/Title";
import Axis from "../Components/Axis";
import Data from "../Components/Data";

const BarChart = ({ width, height, data, label, option }: DataProps) => {
  const {
    svgWidth,
    svgHeight,
    titleHeight,
    chartMargin,
    chartWidth,
    chartHeight,
    xAxis,
    yAxis,
  } = Data({
    width,
    height,
    data,
    label,
    option,
  });

  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    let temp: any = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].x.length; j++) {
        temp.push({ x: data[i].x[j], y: data[i].y[j] });
      }
    }
    console.log(temp);
    setDataList(temp);
  }, []);
  return (
    <div
      style={{
        width: width,
        backgroundColor: option.backgroundColor,
        borderRadius: option.borderRadius,
      }}
    >
      {label.title && (
        <Title width={width} titleHeight={titleHeight} option={label.title} />
      )}
      <div
        style={{
          backgroundColor: option.backgroundColor,
          width: svgWidth,
          height: svgHeight,
          borderRadius: option.borderRadius,
        }}
      >
        <svg width={svgWidth} height={svgHeight}>
          {/* {dataList.length !== 0 &&
            dataList.map((item: any, index) => {
              const xPosition =
                chartMargin.x.body +
                index * (chartWidth / xAxis.numOfGrid) -
                15;
              const yPosition = chartHeight + chartMargin.y.body;
              //   const yPosition = chartHeight - item.y * yAxis.scale;
              return (
                <rect
                  x={xPosition}
                  y={yPosition}
                  width="30"
                  height={item.y}
                  fill="blue"
                />
              );
            })} */}
          <Axis width={width} height={height} data={data} label={label} />
        </svg>
      </div>
    </div>
  );
};
export default BarChart;
