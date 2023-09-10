import { TitleProps } from "../types";

export default function Title({
  width,
  titleHeight,
  chartMarginX,
  option,
}: any) {
  console.log(`${chartMarginX}px`);
  return (
    <div
      style={{
        width: width,
        height: titleHeight,
        display: "flex",
        justifyContent: option?.align || "center",
        alignItems: "end",
        fontSize: option?.fontSize,
      }}
    >
      <div
        style={{
          marginRight: option?.align === "end" ? `${chartMarginX}px` : "0px",
          paddingLeft: option?.align === "start" ? `${chartMarginX}px` : "0px",
        }}
      >
        {option?.text}
      </div>
    </div>
  );
}
