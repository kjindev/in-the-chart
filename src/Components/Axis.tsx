import { useEffect, useState } from "react";
import { DataProps } from "../types";
import Data from "./Data";

const Axis = ({ width, height, data, label }: any) => {
  const {
    svgWidth,
    svgHeight,
    xRange,
    yRange,
    xAxis,
    yAxis,
    chartWidth,
    chartHeight,
    chartMargin,
  } = Data({ width, height, data, label });
  return <div></div>;
  // return (
  //   <svg width={svgWidth} height={svgHeight}>
  //     {/* X Axis Grid */}
  //     {label.x.grid &&
  //       Array.from({ length: Math.floor(xAxis.numOfGrid) - 1 }).map(
  //         (_, index) => {
  //           const xPosition =
  //             chartMargin.x.body + (index + 1) * (chartWidth / xAxis.numOfGrid);
  //           const yPosition = chartMargin.y.body;
  //           return (
  //             <line
  //               key={index}
  //               x1={xPosition}
  //               y1={yPosition}
  //               x2={xPosition}
  //               y2={yPosition + chartHeight}
  //               stroke={label.x.axisColor}
  //             />
  //           );
  //         }
  //       )}
  //     {/* X Axis Label */}
  //     {label.x.display &&
  //       Array.from({ length: Math.ceil(xAxis.numOfGrid) + 1 }).map(
  //         (_, index) => {
  //           const xPosition =
  //             chartMargin.x.body + index * (chartWidth / xAxis.numOfGrid);
  //           const yPosition =
  //             chartHeight + chartMargin.y.body + chartMargin.x.text;
  //           return (
  //             <text
  //               key={index}
  //               x={xPosition}
  //               y={yPosition}
  //               textAnchor="middle"
  //               style={{ fontSize: label.x.fontSize }}
  //             >
  //               {xRange.min + xAxis.step * index > xRange.max
  //                 ? ""
  //                 : xRange.min + xAxis.step * index}
  //             </text>
  //           );
  //         }
  //       )}
  //     {/* Y Axis Grid */}
  //     {label.y.grid &&
  //       Array.from({ length: Math.ceil(yAxis.numOfGrid) }).map((_, index) => {
  //         const xPosition = chartMargin.x.body;
  //         const yPosition =
  //           chartMargin.y.body + index * (chartHeight / yAxis.numOfGrid);
  //         return (
  //           <line
  //             key={index}
  //             x1={xPosition}
  //             y1={yPosition}
  //             x2={xPosition + chartWidth}
  //             y2={yPosition}
  //             stroke={label.y.axisColor}
  //           />
  //         );
  //       })}
  //     {/* Y Axis Label */}
  //     {label.y.display &&
  //       Array.from({ length: Math.ceil(yAxis.numOfGrid) + 1 }).map(
  //         (_, index) => {
  //           const xPosition = chartMargin.x.body - chartMargin.y.text;
  //           const yPosition =
  //             chartMargin.y.body + index * (chartHeight / yAxis.numOfGrid);
  //           return (
  //             <text
  //               key={index}
  //               x={xPosition}
  //               y={yPosition}
  //               textAnchor="end"
  //               alignmentBaseline="middle"
  //               style={{ fontSize: label.y.fontSize }}
  //             >
  //               {yRange.max - yAxis.step * index < yRange.min
  //                 ? ""
  //                 : yRange.max - yAxis.step * index}
  //             </text>
  //           );
  //         }
  //       )}
  //     {/* X axis */}
  //     <line
  //       x1={chartMargin.x.body}
  //       y1={chartMargin.y.body + chartHeight}
  //       x2={chartWidth + chartMargin.x.body}
  //       y2={chartMargin.y.body + chartHeight}
  //       stroke={label.x.axisColor}
  //     />
  //     {/* Y axis */}
  //     <line
  //       x1={chartMargin.x.body}
  //       y1={chartMargin.y.body}
  //       x2={chartMargin.x.body}
  //       y2={chartHeight + chartMargin.y.body}
  //       stroke={label.y.axisColor}
  //     />
  //     {/* X2 axis */}
  //     {label.x.grid && (
  //       <line
  //         x1={chartMargin.x.body + chartWidth}
  //         y1={chartMargin.y.body}
  //         x2={chartMargin.x.body + chartWidth}
  //         y2={chartHeight + chartMargin.y.body}
  //         stroke={label.y.axisColor}
  //       />
  //     )}
  //   </svg>
  // );
};
export default Axis;
