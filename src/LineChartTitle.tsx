import { useEffect } from "react";
import { TitleProps } from "./types";

export default function LinChartTitle({
  width,
  titleHeight,
  option,
}: TitleProps) {
  return (
    <div
      style={{
        width: width,
        height: titleHeight,
        display: "flex",
        justifyContent: option?.align,
        alignItems: "end",
        fontSize: option?.fontSize,
      }}
    >
      {option?.text}
    </div>
  );
}
