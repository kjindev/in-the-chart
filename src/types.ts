export interface XYType {
  x: number;
  y: number;
}

export interface DataType {
  x: number[];
  y: number[];
  lineColor: string;
  pointColor: string;
  pointSize: string;
  areaColor: string;
}

export interface DataProps {
  width: number;
  height: number;
  data: DataType[];
  label: {
    x: {
      display?: boolean;
      min?: number;
      max?: number;
      step?: number;
      axisColor?: string;
      fontSize?: string;
    };
    y: {
      display?: boolean;
      min?: number;
      max?: number;
      step?: number;
      axisColor?: string;
      fontSize?: string;
    };
  };
  option: {
    backgroundColor?: string;
  };
}

export interface DatasetType {
  points: XYType[];
  pointsPath: string;
  areaPoints: XYType[];
  areaPath: string;
  lineColor: string;
  pointColor: string;
  pointSize: string;
  areaColor: string;
}
