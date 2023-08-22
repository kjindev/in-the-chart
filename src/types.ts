export interface XYType {
  x: number;
  y: number;
}

export interface DataType {
  x: number[];
  y: number[];
  lineColor?: string;
  pointColor?: string;
  pointSize?: string;
  areaColor?: string;
}

export interface DatasetType {
  points: XYType[];
  pointsPath: string;
  areaPoints: XYType[];
  areaPath: string;
  lineColor: string | undefined;
  pointColor: string | undefined;
  pointSize: string | undefined;
  areaColor: string | undefined;
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
      grid?: boolean;
    };
    y: {
      display?: boolean;
      min?: number;
      max?: number;
      step?: number;
      axisColor?: string;
      fontSize?: string;
      grid?: boolean;
    };
    title: {
      text?: string;
      fontSize?: string;
    };
  };
  option: {
    backgroundColor?: string;
    borderRadius?: string;
  };
}
