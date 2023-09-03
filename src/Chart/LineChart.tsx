import { useEffect, useState } from "react";
import { DataProps, XYType, DatasetType } from "../types";
import Title from "../Components/Title";
import Axis from "../Components/Axis";
import Data from "../Components/Data";

const LineChart = ({ width, height, data, label, option }: DataProps) => {
  const { svgWidth, svgHeight, titleHeight, dataset } = Data({
    width,
    height,
    data,
    label,
    option,
  });

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
          {dataset?.map((item: DatasetType, index: number) => (
            <g key={index}>
              <polyline
                points={item?.pointsPath}
                fill="none"
                stroke={item?.lineColor}
                strokeWidth="2"
              />
              {item?.areaColor && (
                <polygon
                  points={item?.areaPath}
                  fill={item?.areaColor}
                  opacity={0.2}
                />
              )}
              {item?.points.map((point: XYType, index: number) => (
                <circle
                  key={index}
                  cx={point?.x}
                  cy={point?.y}
                  r={item?.pointSize}
                  fill={item?.pointColor}
                />
              ))}
            </g>
          ))}
          <Axis
            width={width}
            height={height}
            data={data}
            label={label}
            option={option}
          />
        </svg>
      </div>
    </div>
  );
};
export default LineChart;
