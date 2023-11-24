import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { colors, sensorData, variantNumber } from "./types/types";

type graphics = {
  clear: () => void;
  beginFill: (color: number) => void;
  drawCircle: (x: number, y: number, size: number) => void;
  endFill: () => void;
};

interface prevpointProps {
  previous: sensorData;
  height: number;
  width: number;
  factor?: number;
  color: colors
}

export function PrevPoints(props: prevpointProps) {
  const center = { x: props.width / 2, y: props.height / 2 };
  const drawPoints = useCallback(
    (g: graphics) => {
      for (let i = 0; i < 12; i++) {
        if ((props.previous as unknown as variantNumber)[i] !== undefined) {
          let channelData = (props.previous as unknown as variantNumber)[i];
          if(props.factor) {
            channelData = channelData / props.factor;
          }
          g;
          g.clear();
          g.beginFill(props.color);
          g.drawCircle(center.x, center.y, channelData);
          g.endFill();
        }
      }
    },
    [center.x, center.y, props.previous],
  );

  return (
    <Container>
      <Graphics draw={drawPoints}></Graphics>
    </Container>
  );
}
