import React, { useEffect, useState } from "react";
import { DataProps, DatasetType, XYType } from "../types";

export default function Data({ width, height, data, label }: DataProps) {
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

  const [dataset, setDataset] = useState<DatasetType[]>([]);

  useEffect(() => {
    let points: XYType[][] = [];
    let pointsPath: string | string[] = [];
    let areaPoints: XYType[][] = [];
    let areaPath: string | string[] = [];

    if (xAxis && yAxis && points.length < data.length) {
      let temp1: XYType[][] = [];
      for (let i = 0; i < data.length; i++) {
        let temp2: XYType[] = [];
        for (let j = 0; j < data[i].x.length; j++) {
          let item = { x: 0, y: 0 };
          item = {
            x: (data[i].x[j] - xRange.min) * xAxis.scale + chartMargin.x.body,
            y:
              chartHeight -
              (data[i].y[j] - yRange.min) * yAxis.scale +
              chartMargin.y.body,
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
            y: chartHeight + chartMargin.y.body,
          },
          { x: points[i][0].x, y: chartHeight + chartMargin.y.body },
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
          lineColor: data[i].lineColor ? data[i].lineColor : "black",
          pointColor: data[i].pointColor ? data[i].pointColor : "black",
          pointSize: data[i].pointSize ? data[i].pointSize : "3",
          areaColor: data[i].areaColor ? data[i].areaColor : "rgb(0,0,0,0)",
        });
      }

      setDataset(datasetTemp);
      if (dataset.length !== 0) {
      }
    }
  }, [xAxis, yAxis]);

  return { svgWidth, svgHeight, titleHeight, dataset };
}
