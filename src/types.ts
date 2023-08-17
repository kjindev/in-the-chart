export interface DataType {
  x: number;
  y: number;
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
  style: {
    backgroundColor?: string;
    lineColor?: string;
    pointColor?: string;
    pointSize?: string;
    areaColor?: string;
    areaGradient?: string[];
  };
}
