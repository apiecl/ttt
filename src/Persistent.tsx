import { Graphics, Container, withFilters } from "@pixi/react";
import * as PIXI from "pixi.js";
import { position, colors } from "./types/types";
import { useCallback } from "react";

interface persistentProps {
  position: position;
  size: number;
  color: colors;
  alpha: number;
}
type graphics = {
  clear: () => void;
  beginFill: (color: number) => void;
  drawCircle: (x: number, y: number, size: number) => void;
  endFill: () => void;
};

export function Persistent(props: persistentProps) {
  const Filters = withFilters(Container, {
    alpha: PIXI.AlphaFilter
  } );

  const drawCircle = useCallback(
    (g: graphics) => {
      g;
      g.clear();
      g.beginFill(props.color);
      g.drawCircle(props.position.x, props.position.y, props.size);
      g.endFill();
    },
    [props],
  );

  return <Filters alpha={props.alpha}><Graphics draw={drawCircle} /></Filters>
}
