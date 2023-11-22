import { Graphics } from "@pixi/react";
import { useCallback } from "react";
import { sensorData, variantNumber } from "./types/types";
import { calcPos, calcRadius } from "./utils/utils";

type graphics = {
  clear: () => void;
  beginFill: (color: number) => void;
  drawCircle: (x: number, y: number, size: number) => void;
  endFill: () => void;
};

interface prevpointProps {
    previous: sensorData,
    height: number,
    width: number
}

export function PrevPoints(props:prevpointProps) {
const center = { x: props.width / 2, y: props.height / 2 };
  const drawPoints = useCallback((g: graphics) => {
    for (let i = 0; i < 12; i++) {
      if ((props.previous as unknown as variantNumber)[i] !== undefined) {
        const channelData = (props.previous as unknown as variantNumber)[i];
        g;
        g.clear();
        g.beginFill(0xcb2f5c);
        const radius = calcRadius(channelData, 50, props.height);
        const angle = 30 * i;
        const pos = calcPos(radius, angle);
        g.drawCircle(pos.x + center.x , pos.y + center.y, 10);
        g.endFill();
      }
    }
  }, [center.x, center.y, props.height, props.previous]);

  return <Graphics draw={drawPoints}></Graphics>;
}
