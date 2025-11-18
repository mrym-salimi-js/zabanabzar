import { ReactElement } from "react";

export default function ThreePointsLoading({
  circleColor,
}: {
  circleColor: string;
}): ReactElement {
  return (
    <div className="flex gap-1  ">
      <div
        className={`w-1 h-1 ${circleColor} rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`w-1 h-1 ${circleColor} rounded-full animate-bounce [animation-delay:-0.15s]`}
      ></div>
      <div
        className={`w-1 h-1 ${circleColor} rounded-full animate-bounce`}
      ></div>
    </div>
  );
}
